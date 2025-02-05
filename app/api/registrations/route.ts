import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        teamLeader: true,
        teamMembers: true,
        players: true,
      },
    });

    const stats = {
      totalRegistrations: registrations.length,
      totalRevenue: registrations.reduce((acc, reg) => acc + reg.amount, 0),
      activeEvents: new Set(registrations.map((reg) => reg.eventType)).size,
      todayRegistrations: registrations.filter(
        (reg) =>
          reg.createdAt.toISOString().split("T")[0] ===
          new Date().toISOString().split("T")[0]
      ).length,
    };

    return NextResponse.json({ registrations, stats });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
