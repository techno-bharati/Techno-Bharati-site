import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { registrationId, paymentMode } = await req.json();

    if (!registrationId || !paymentMode) {
      return NextResponse.json(
        { error: "Registration ID and payment mode are required" },
        { status: 400 }
      );
    }

    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: { paymentMode },
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
    });

    return NextResponse.json({
      success: true,
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Error updating payment mode:", error);
    return NextResponse.json(
      { error: "Failed to update payment mode" },
      { status: 500 }
    );
  }
} 