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

    let eventSpecificData = {};

    switch (formData.events) {
      case "Face To Face":
      case "Python Worriors":
      case "AI Tales":
        eventSpecificData = {
          studentName: formData.studentName,
          contactNumber: formData.contactNumber,
          email: formData.email,
        };
        break;

      case "Startup Sphere":
        eventSpecificData = {
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
        };
        break;

      case "FireFire Battleship":
        eventSpecificData = {
          squadName: formData.squadName,
          players: {
            create: formData.players!.map((player) => ({
              playerName: player.playerName,
              freeFireId: player.freeFireId,
              contactNumber: player.contactNumber,
            })),
          },
        };
        break;
    }

    const registration = await prisma.registration.create({
      data: {
        ...baseData,
        ...eventSpecificData,
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
