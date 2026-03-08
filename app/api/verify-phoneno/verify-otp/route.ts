import { NextRequest } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, code } = await req.json();

    if (!phoneNumber || !code) {
      return Response.json(
        { success: false, message: "Phone number and OTP code are required." },
        { status: 400 }
      );
    }

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    if (verificationCheck.status === "approved") {
      return Response.json(
        {
          success: true,
          message: "Phone number verified successfully.",
          status: verificationCheck.status, // "approved"
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid or expired OTP.",
          status: verificationCheck.status, // "pending"
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Verify OTP error:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to verify OTP.",
      },
      { status: 500 }
    );
  }
}
