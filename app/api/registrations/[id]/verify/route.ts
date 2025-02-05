import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const registration = await prisma.registration.update({
      where: { id: params.id },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        verifiedAt: new Date(),
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify registration" },
      { status: 500 }
    );
  }
}
