import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ConfirmationEmail } from "@/components/emails/ConfirmationEmail";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 5,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { registration } = body;

    const eventName = registration.eventType.replace(/_/g, " ");

    const html = await render(ConfirmationEmail({ registration }));

    await transporter.sendMail({
      from: {
        name: "Techno Bharati 2k26",
        address: process.env.GMAIL_USER as string,
      },
      to: registration.email || registration.teamLeader?.email,
      subject: `Registration Confirmed — ${eventName} | Techno Bharati 2k26`,
      html,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
