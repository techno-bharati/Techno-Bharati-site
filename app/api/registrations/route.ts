import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  AdminRole,
  EventType,
  Department,
} from "@/prisma/generated/prisma/client";

/** Fallback: event types per department when Event table is empty or not seeded. */
const DEPARTMENT_EVENT_TYPES: Partial<Record<Department, EventType[]>> = {
  AIML: [
    EventType.STARTUP_SPHERE,
    EventType.FACE_TO_FACE,
    EventType.PYTHON_FRONTIERS,
    EventType.BGMI,
    EventType.AI_TALES,
  ],
  GENERAL_ENGINEERING: [
    EventType.GE_TECHNO_SCIENCE_QUIZ,
    EventType.GE_POSTER_COMPETITION,
    EventType.GE_SCITECH_MODEL_EXPO,
    EventType.GE_GAMES_BUNDLE,
  ],
  CIVIL: [
    EventType.CE_MODEL_MAKING,
    EventType.CE_CAD_MASTER,
    EventType.CE_VIDEOGRAPHY,
  ],
  CSE: [
    EventType.CSE_CODEFUSION,
    EventType.CSE_PROJECT_EXPO,
    EventType.CSE_TREASURE_HUNT,
  ],
  ENTC: [
    EventType.ENTC_PROJECT_EXPO,
    EventType.ENTC_DIGITAL_DANGAL,
    EventType.ENTC_SNAP_AND_SHINE,
  ],
  MECHANICAL: [
    EventType.MECH_PROJECT_EXPO,
    EventType.MECH_JUNK_YARD,
    EventType.MECH_IPL_AUCTION,
  ],
};

interface JWTPayload {
  sub: string;
  email: string;
  role: AdminRole;
  eventType: EventType | null;
  department: string | null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventType = searchParams.get("eventType") || null;
  const department = searchParams.get("department") || null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const payload = verified.payload as unknown as JWTPayload;

    const where: Record<string, unknown> = {};

    // Optional filter by eventType from query param
    if (eventType && eventType !== "all") {
      where.eventType = eventType as EventType;
    }

    // Helper: filter by event's department (from Event table), not student's department
    const departmentForFilter =
      department &&
      department !== "all" &&
      payload.role === AdminRole.SUPER_ADMIN
        ? (department as Department)
        : payload.role === AdminRole.DEPARTMENT_ADMIN && payload.department
          ? (payload.department as Department)
          : null;

    if (departmentForFilter) {
      let eventTypesForDept: EventType[];
      try {
        const eventsForDept = await prisma.event.findMany({
          where: { department: departmentForFilter },
          select: { eventType: true },
        });
        eventTypesForDept = eventsForDept.map((e) => e.eventType);
      } catch {
        eventTypesForDept = [];
      }
      if (
        eventTypesForDept.length === 0 &&
        DEPARTMENT_EVENT_TYPES[departmentForFilter]
      ) {
        eventTypesForDept = DEPARTMENT_EVENT_TYPES[departmentForFilter]!;
      }
      if (eventTypesForDept.length > 0) {
        where.eventType = { in: eventTypesForDept };
      }
    }
    // SUPER_ADMIN with no department filter: no extra where (sees all)
    // DEPARTMENT_ADMIN: already applied above via departmentForFilter

    // EVENT_ADMIN is always locked to a single event, regardless of query param
    if (payload.role === AdminRole.EVENT_ADMIN && payload.eventType) {
      where.eventType = payload.eventType;
    }

    const [registrations, stats] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          teamLeader: true,
          teamMembers: true,
          players: true,
          verifiedBy: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.$transaction([
        prisma.registration.count({ where }),
        prisma.registration.aggregate({
          where: {
            ...where,
            status: "CONFIRMED",
          },
          _sum: { amount: true },
        }),
        prisma.registration.groupBy({
          by: ["eventType"],
          where,
          _count: {
            _all: true,
          },
          orderBy: {
            eventType: "asc",
          },
        }),
        prisma.registration.count({
          where: {
            ...where,
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),
        prisma.registration.aggregate({
          where,
          _sum: {
            numberOfTeamMembers: true,
          },
        }),
        prisma.registration.count({
          where: {
            ...where,
            OR: [
              { eventType: "FACE_TO_FACE" },
              { eventType: "PYTHON_FRONTIERS" },
              { eventType: "AI_TALES" },
            ],
          },
        }),
        prisma.player.count(),
        prisma.registration.aggregate({
          where: {
            ...where,
            status: "CONFIRMED",
            paymentMode: "OFFLINE",
          },
          _sum: { amount: true },
        }),
      ]),
    ]);

    let totalParticipants = 0;

    if (!eventType || eventType === "all") {
      totalParticipants =
        (stats[4]._sum.numberOfTeamMembers || 0) + stats[5] + stats[6];
    } else if (eventType === "STARTUP_SPHERE") {
      totalParticipants = stats[4]._sum.numberOfTeamMembers || 0;
    } else if (eventType === "BGMI") {
      totalParticipants = stats[0] * 4;
    } else {
      totalParticipants = stats[0];
    }

    const offlineRevenue = stats[7]._sum.amount || 0;

    const totalRevenueForEvent = stats[1]._sum.amount || 0;

    return NextResponse.json({
      registrations,
      stats: {
        totalRegistrations: stats[0],
        totalRevenue: stats[1]._sum.amount || 0,
        totalRevenueForEvent,
        offlineRevenue: offlineRevenue,
        activeEvents: stats[2].length,
        todayRegistrations: stats[3],
        eventBreakdown: stats[2].reduce(
          (acc, curr) => {
            if (curr._count && typeof curr._count === "object") {
              acc[curr.eventType] = curr._count._all ?? 0;
            }
            return acc;
          },
          {} as Record<string, number>
        ),
        totalParticipants,
      },
    });
  } catch (error) {
    console.error("Registration fetch error:", error);
    const message = error instanceof Error ? error.message : String(error);

    // If the DB hasn't been migrated to include some EventType values yet
    // (common when filtering by a department that has no registrations),
    // Postgres can throw: invalid input value for enum "EventType": "..."
    // In that case, return a safe empty payload so the dashboard doesn't break.
    if (
      message.toLowerCase().includes("invalid input value for enum") &&
      message.includes("EventType")
    ) {
      return NextResponse.json({
        registrations: [],
        stats: {
          totalRegistrations: 0,
          totalRevenue: 0,
          totalRevenueForEvent: 0,
          offlineRevenue: 0,
          activeEvents: 0,
          todayRegistrations: 0,
          eventBreakdown: {} as Record<string, number>,
          totalParticipants: 0,
        },
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
