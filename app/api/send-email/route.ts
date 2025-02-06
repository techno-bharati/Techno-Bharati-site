import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 5,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { registration } = body;

    let participantDetails = "";
    if (
      ["FACE_TO_FACE", "PYTHON_WARRIORS", "AI_TALES"].includes(
        registration.eventType
      )
    ) {
      participantDetails = `
        <h3>Participant Details:</h3>
        <p>Name: ${registration.studentName}</p>
        <p>Email: ${registration.email}</p>
        <p>Contact: ${registration.contactNumber}</p>
      `;
    } else if (registration.eventType === "STARTUP_SPHERE") {
      participantDetails = `
        <h3>Team Information:</h3>
        <p>Team Name: ${registration.teamName}</p>
        <p>Category: ${registration.startupCategory}</p>
        <p>Number of Members: ${registration.numberOfTeamMembers}</p>
        
        <h3>Team Leader:</h3>
        <p>Name: ${registration.teamLeader?.studentName}</p>
        <p>Email: ${registration.teamLeader?.email}</p>
        <p>Contact: ${registration.teamLeader?.contactNumber}</p>

        ${
          registration.teamMembers?.length > 0
            ? `
          <h3>Team Members:</h3>
          ${registration.teamMembers
            .map(
              (member: any, index: number) => `
            <div style="margin-left: 20px; margin-bottom: 10px;">
              <p>Member ${index + 1}: ${member.studentName}</p>
              <p>Email: ${member.email}</p>
              <p>Contact: ${member.contactNumber}</p>
            </div>
          `
            )
            .join("")}
        `
            : ""
        }
      `;
    } else if (registration.eventType === "FREEFIRE_BATTLESHIP") {
      participantDetails = `
        <h3>Squad Information:</h3>
        <p>Squad Name: ${registration.squadName}</p>
        ${registration.players
          ?.map(
            (player: any, index: number) => `
          <div style="margin-left: 20px; margin-bottom: 10px;">
            <p><strong>${
              index === 0 ? "Squad Leader" : `Player ${index + 1}`
            }:</strong> ${player.playerName}</p>
            <p>FreeFire ID: ${player.freeFireId}</p>
            <p>Contact: ${player.contactNumber}</p>
            ${index === 0 ? `<p>Email: ${player.email}</p>` : ""}
          </div>
        `
          )
          .join("")}
      `;
    } else {
      participantDetails = `
        <h3>Squad Information:</h3>
        <p>Squad Name: ${registration.squadName}</p>
        ${registration.players
          ?.map(
            (player: any, index: number) => `
          <p>Player ${index + 1}: ${player.playerName}</p>
          <p>FreeFire ID: ${player.freeFireId}</p>
          <p>Contact: ${player.contactNumber}</p>
        `
          )
          .join("")}
      `;
    }

    const mailOptions = {
      from: {
        name: "Techno Bharati 2025",
        address: process.env.GMAIL_USER as string,
      },
      to: registration.email || registration.teamLeader?.email,
      subject: `Registration Confirmed - ${registration.eventType.replace(
        /_/g,
        " "
      )} | Techno Bharati 2025`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-bottom: 20px; text-align: center;">Registration Confirmed! 🎉</h2>
              
              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 16px; margin-bottom: 15px;">Dear Participant,</p>
                <p style="margin-bottom: 15px;">Your registration for <strong>${registration.eventType.replace(
                  /_/g,
                  " "
                )}</strong> has been successfully confirmed.</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  <h3 style="color: #2c3e50; margin-bottom: 15px;">Event Details:</h3>
                  <p><strong>Event:</strong> ${registration.eventType.replace(
                    /_/g,
                    " "
                  )}</p>
                  <p><strong>College:</strong> ${registration.collegeName}</p>
                  <p><strong>Amount Paid:</strong> ₹${registration.amount}</p>
                  <p><strong>Registration Date:</strong> ${new Date(
                    registration.createdAt
                  ).toLocaleDateString()}</p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  ${participantDetails}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="margin-bottom: 15px;">Thank you for registering! We look forward to your participation.</p>
                <p style="color: #666; font-size: 14px;">If you have any questions, please don't hesitate to contact us.</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px;">
                  This is an automated message from Techno Bharati 2025.<br>
                  Please do not reply to this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "List-Unsubscribe": `<mailto:${process.env.GMAIL_USER}>`,
      },
      priority: "high" as const,
      text: `
        Registration Confirmed - ${registration.eventType.replace(/_/g, " ")}
        
        Your registration has been confirmed.
        
        Event Details:
        Event: ${registration.eventType.replace(/_/g, " ")}
        College: ${registration.collegeName}
        Amount Paid: ₹${registration.amount}
        Registration Date: ${new Date(
          registration.createdAt
        ).toLocaleDateString()}
        
        Thank you for registering!
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
