import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookiesList = await cookies();
    const token = cookiesList.get("admin-token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const payload = verified.payload as any;

    const admin = await prisma.admin.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        eventType: true,
      },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      eventType: admin.eventType,
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin details" },
      { status: 500 }
    );
  }
}
