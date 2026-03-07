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
    EventType.CE_BATTLE_OF_BRAINS,
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

const EVENT_TO_DEPARTMENT: Partial<Record<EventType, Department>> =
  Object.entries(DEPARTMENT_EVENT_TYPES).reduce(
    (acc, [dept, events]) => {
      (events ?? []).forEach((eventType) => {
        acc[eventType] = dept as Department;
      });
      return acc;
    },
    {} as Partial<Record<EventType, Department>>
  );

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
  const fromDeclaredSize =
    typeof reg.numberOfTeamMembers === "number" && reg.numberOfTeamMembers > 0
      ? reg.numberOfTeamMembers
      : 0;

  const count = Math.max(fromRelations, fromDeclaredSize, 1);
  return count;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventTypeParam = searchParams.get("eventType") || null;
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
    const whereForEventsCard: Record<string, unknown> = {};
    const eventTypeFilter =
      eventTypeParam && eventTypeParam !== "all"
        ? (eventTypeParam as EventType)
        : null;

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
      const deptEvents = DEPARTMENT_EVENT_TYPES[departmentForFilter] ?? [];
      eventTypesForDept = [
        ...new Set([...eventTypesForDept, ...deptEvents]),
      ] as EventType[];
      if (eventTypesForDept.length > 0) {
        whereForEventsCard.eventType = { in: eventTypesForDept };

        if (eventTypeFilter) {
          if (eventTypesForDept.includes(eventTypeFilter)) {
            where.eventType = eventTypeFilter;
          } else {
            where.eventType = { in: eventTypesForDept };
          }
        } else {
          where.eventType = { in: eventTypesForDept };
        }
      }
    } else if (eventTypeFilter) {
      where.eventType = eventTypeFilter;
    }

    if (payload.role === AdminRole.EVENT_ADMIN && payload.eventType) {
      where.eventType = payload.eventType;
      whereForEventsCard.eventType = payload.eventType;
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
          where:
            Object.keys(whereForEventsCard).length > 0
              ? whereForEventsCard
              : where,
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
      ]),
    ]);

    const totalParticipants = registrations.reduce(
      (sum, reg) => sum + getRegistrationParticipants(reg),
      0
    );

    const offlineRevenue = stats[4]._sum.amount || 0;

    const totalRevenueForEvent = stats[1]._sum.amount || 0;

    const departmentBreakdown = (stats[2] ?? []).reduce(
      (acc, curr) => {
        const dept = EVENT_TO_DEPARTMENT[curr.eventType];
        if (!dept) return acc;

        const count =
          curr._count && typeof curr._count === "object"
            ? (curr._count._all ?? 0)
            : 0;

        acc[dept] = (acc[dept] ?? 0) + count;
        return acc;
      },
      {} as Record<string, number>
    );

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
        departmentBreakdown,
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
