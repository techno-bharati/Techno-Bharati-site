"use server";

import prisma from "@/lib/prisma";
import { userRegistrationFormSchema } from "@/schema/userRegistrationForm";
import { z } from "zod";
import { uploadImage } from "@/lib/uploadImage";

export async function createRegistration(
  formData: z.infer<typeof userRegistrationFormSchema>
) {
  try {
    const uploadResult = await uploadImage(formData.payss);
    if (!uploadResult.success) {
      return { success: false, error: "Failed to upload payment screenshot" };
    }

    const baseData = {
      collegeName: formData.collegeName,
      eventType: formData.events.toUpperCase().replace(/\s+/g, "_") as any,
      paymentScreenshot: uploadResult.url!,
      amount: getEventAmount(formData.events),
    };

    // Create registration based on event type
    const registration = await prisma.registration.create({
      data:
        formData.events === "Startup Sphere"
          ? {
              ...baseData,
              startupCategory: formData.startupCategory,
              numberOfTeamMembers: formData.numberOfTeamMembers,
              teamName: formData.teamName,
              teamLeader: {
                create: {
                  studentName: formData.teamLeader.studentName,
                  contactNumber: formData.teamLeader.contactNumber,
                  email: formData.teamLeader.email,
                },
              },
              ...(formData.teamMembers && {
                teamMembers: {
                  create: formData.teamMembers.map((member) => ({
                    studentName: member.studentName!,
                    contactNumber: member.contactNumber!,
                    email: member.email!,
                  })),
                },
              }),
            }
          : formData.events === "FireFire Battleship"
          ? {
              ...baseData,
              squadName: formData.squadName,
              players: {
                create: formData.players!.map((player) => ({
                  playerName: player.playerName,
                  freeFireId: player.freeFireId,
                  contactNumber: player.contactNumber,
                })),
              },
            }
          : {
              ...baseData,
              studentName: formData.studentName,
              contactNumber: formData.contactNumber,
              email: formData.email,
            },
    });

    return { success: true, data: registration };
  } catch (error) {
    return { success: false, error: "Failed to create registration" };
  }
}

function getEventAmount(event: string): number {
  switch (event) {
    case "Startup Sphere":
      return 500;
    case "FireFire Battleship":
      return 400;
    default:
      return 200;
  }
}
