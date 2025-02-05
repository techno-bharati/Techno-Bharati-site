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

    console.log("Token:", token); // Debug token

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const payload = verified.payload as unknown as JWTPayload;

    console.log("Payload:", payload); // Debug payload

    const where =
      payload.role === AdminRole.EVENT_ADMIN && payload.eventType
        ? { eventType: payload.eventType }
        : {};

    console.log("Query where:", where); // Debug query

    const [registrations, stats] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          teamLeader: true,
          teamMembers: true,
          players: true,
        },
      }),
      prisma.$transaction([
        prisma.registration.count({ where }),
        prisma.registration.aggregate({
          where,
          _sum: { amount: true },
        }),
        prisma.registration.groupBy({
          by: ["eventType"],
          where,
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
      ]),
    ]);

    console.log("Registrations found:", registrations.length); // Debug results

    return NextResponse.json({
      registrations,
      stats: {
        totalRegistrations: stats[0],
        totalRevenue: stats[1]._sum.amount || 0,
        activeEvents: stats[2].length,
        todayRegistrations: stats[3],
      },
    });
  } catch (error) {
    console.error("Registration error:", error); // Debug errors
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
