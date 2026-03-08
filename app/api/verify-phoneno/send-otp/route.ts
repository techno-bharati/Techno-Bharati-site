import { NextRequest } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return Response.json(
        { success: false, message: "Phone number is required." },
        { status: 400 }
      );
    }

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    return Response.json(
      {
        success: true,
        message: "OTP sent successfully.",
        status: verification.status, // "pending"
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Send OTP error:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to send OTP.",
      },
      { status: 500 }
    );
  }
}
