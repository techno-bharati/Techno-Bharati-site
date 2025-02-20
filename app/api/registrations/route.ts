import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminRole, EventType } from "@prisma/client";

interface JWTPayload {
  sub: string;
  email: string;
  role: AdminRole;
  eventType: EventType | null;
}

export async function GET() {
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

    const where =
      payload.role === AdminRole.EVENT_ADMIN && payload.eventType
        ? { eventType: payload.eventType }
        : {};

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
      ]),
    ]);

    const totalParticipants = 
      (stats[4]._sum.numberOfTeamMembers || 0) + // Startup Sphere members
      stats[5] + // Individual participants
      stats[6]; // FreeFire players

    return NextResponse.json({
      registrations,
      stats: {
        totalRegistrations: stats[0],
        totalRevenue: stats[1]._sum.amount || 0,
        activeEvents: stats[2].length,
        todayRegistrations: stats[3],
        eventBreakdown: stats[2].reduce((acc, curr) => {
          if (curr._count && typeof curr._count === "object") {
            acc[curr.eventType] = curr._count._all ?? 0;
          }
          return acc;
        }, {} as Record<string, number>),
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
