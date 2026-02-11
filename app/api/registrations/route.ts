import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  AdminRole,
  EventType,
  Department,
} from "@/prisma/generated/prisma/client";

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

    // Optional department filter for SUPER_ADMIN only
    if (
      department &&
      department !== "all" &&
      payload.role === AdminRole.SUPER_ADMIN
    ) {
      where.department = department as Department;
    }

    // EVENT_ADMIN is always locked to a single event, regardless of query param
    if (payload.role === AdminRole.EVENT_ADMIN && payload.eventType) {
      where.eventType = payload.eventType;
    }

    // Department-level admins can see all registrations for their department
    if (payload.role === AdminRole.DEPARTMENT_ADMIN && payload.department) {
      where.department = payload.department;
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
              { eventType: "PYTHON_WARRIORS" },
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
    } else if (eventType === "FREEFIRE_BATTLESHIP") {
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
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
