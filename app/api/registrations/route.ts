import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  AdminRole,
  EventType,
  Department,
} from "@/prisma/generated/prisma/client";

const DEPARTMENT_EVENT_TYPES: Partial<Record<Department, EventType[]>> = {
  AIML: [EventType.FACE_TO_FACE, EventType.PYTHON_FRONTIERS, EventType.BGMI],
  GENERAL_ENGINEERING: [
    EventType.GE_TECHNO_SCIENCE_QUIZ,
    EventType.GE_POSTER_COMPETITION,
    EventType.GE_SCITECH_MODEL_EXPO,
    EventType.GE_GAMES_BUNDLE,
    EventType.FREEFIRE,
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

function getRegistrationParticipants(reg: {
  eventType: EventType;
  studentName?: string | null;
  numberOfTeamMembers?: number | null;
  teamLeader?: unknown | null;
  teamMembers?: unknown[] | null;
  players?: unknown[] | null;
}): number {
  if (
    reg.eventType === EventType.BGMI ||
    reg.eventType === EventType.FREEFIRE
  ) {
    const players = reg.players?.length ?? 0;
    // If player rows are missing for a squad, fall back to expected squad size.
    return players > 0 ? players : 4;
  }

  const memberCount = reg.teamMembers?.length ?? 0;
  const hasStudent = reg.studentName ? 1 : 0;
  const hasTeamLeader = reg.teamLeader ? 1 : 0;
  const leaderCount = Math.max(hasStudent, hasTeamLeader);

  const fromRelations = leaderCount + memberCount;
  if (fromRelations > 0) return fromRelations;

  const fromDeclaredSize =
    typeof reg.numberOfTeamMembers === "number" && reg.numberOfTeamMembers > 0
      ? reg.numberOfTeamMembers
      : 0;
  if (fromDeclaredSize > 0) return fromDeclaredSize;

  return 1;
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
          where: { ...where, status: "CONFIRMED" },
          _sum: { amount: true },
        }),
        prisma.registration.groupBy({
          by: ["eventType"],
          where,
          _count: { _all: true },
          orderBy: { eventType: "asc" },
        }),
        prisma.registration.count({
          where: {
            ...where,
            createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
          },
        }),
        prisma.registration.aggregate({
          where: { ...where, status: "CONFIRMED", paymentMode: "OFFLINE" },
          _sum: { amount: true },
        }),
        prisma.registration.groupBy({
          by: ["department"],
          where,
          _count: { _all: true },
          orderBy: { department: "asc" },
        }),
      ]),
    ]);

    const totalParticipants = registrations.reduce(
      (sum, reg) => sum + getRegistrationParticipants(reg),
      0
    );

    const offlineRevenue = stats[4]._sum.amount || 0;

    const totalRevenueForEvent = stats[1]._sum.amount || 0;

    return NextResponse.json({
      registrations,
      stats: {
        totalRegistrations: stats[0],
        totalRevenue: stats[1]._sum.amount || 0,
        totalRevenueForEvent: stats[1]._sum.amount || 0,
        offlineRevenue: stats[4]._sum.amount || 0,
        activeEvents: stats[2].length,
        todayRegistrations: stats[3],
        eventBreakdown: (stats[2] ?? []).reduce(
          (acc, curr) => {
            if (curr._count && typeof curr._count === "object") {
              acc[curr.eventType] = curr._count._all ?? 0;
            }
            return acc;
          },
          {} as Record<string, number>
        ),
        totalParticipants,
        departmentBreakdown: (stats[5] ?? []).reduce(
          (acc, curr) => {
            if (
              curr.department &&
              curr._count &&
              typeof curr._count === "object"
            ) {
              acc[curr.department] = curr._count._all ?? 0;
            }
            return acc;
          },
          {} as Record<string, number>
        ),
      },
    });
  } catch (error) {
    console.error("Registration fetch error:", error);
    const message = error instanceof Error ? error.message : String(error);

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
          departmentBreakdown: {} as Record<string, number>,
        },
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
