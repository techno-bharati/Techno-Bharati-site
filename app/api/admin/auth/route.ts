import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    console.log("admin found::::1")

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = password === admin.password;

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const jwtPayload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
      eventType: admin.eventType,
      department: admin.department ?? null,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    };

    const token = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

      console.log("admin-fourned:::2")

    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    console.log("admin-fourned:::3")

    return NextResponse.json({
      message: "Logged in successfully",
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        eventType: admin.eventType,
        department: admin.department ?? null,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
