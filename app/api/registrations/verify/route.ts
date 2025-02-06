import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const { registrationId } = await request.json();

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: "CONFIRMED",
        verifiedAt: new Date(),
      },
      include: {
        teamLeader: true,
        teamMembers: true,
        players: true,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify registration" },
      { status: 500 }
    );
  }
}
