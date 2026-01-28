"use server";

import prisma from "@/lib/prisma";
import { userRegistrationFormSchema } from "@/schema/userRegistrationForm";
import { z } from "zod";
import { uploadImage } from "@/lib/uploadImage";
import { getEventFeeByName } from "@/lib/constants";

export async function createRegistration(
  formData: z.infer<typeof userRegistrationFormSchema>
) {
  try {
    const uploadResult = await uploadImage(formData.payss);
    if (!uploadResult.success) {
      return { success: false, error: "Failed to upload payment screenshot" };
    }

    const eventTypeMap = {
      "Startup Sphere": "STARTUP_SPHERE",
      "Face To Face": "FACE_TO_FACE",
      "Python Worriors": "PYTHON_WARRIORS",
      "FreeFire Battleship": "FREEFIRE_BATTLESHIP",
      "AI Tales": "AI_TALES",
    } as const;

    const calculateTotalFee = (data: typeof formData) => {
      const eventName = data.events;
      const teamSize =
        eventName === "Startup Sphere"
          ? (data.teamMembers?.length || 0) + 1
          : 1;
      const fee = getEventFeeByName(eventName, teamSize);

      if (eventName === "Startup Sphere") {
        return fee ?? 0;
      } else if (eventName === "FreeFire Battleship") {
        return fee ?? 0;
      }

      return fee ?? 0;
    };

    const amount = calculateTotalFee(formData);

    const baseData = {
      collegeName: formData.collegeName,
      eventType: eventTypeMap[formData.events],
      paymentScreenshot: uploadResult.url!,
      paymentMode: formData.paymentMode,
      amount,
      department: formData.department,
      class: formData.class,
    };

    try {
      if (formData.events === "FreeFire Battleship") {
        console.log("Creating FreeFire registration with data:", {
          squadName: formData.squadName,
          leaderEmail: formData.players[0].email,
          playerCount: formData.players.length,
        });
      }

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
            : formData.events === "FreeFire Battleship"
              ? {
                  ...baseData,
                  squadName: formData.squadName,
                  email: formData.players[0].email,
                  contactNumber: formData.players[0].contactNumber,
                  players: {
                    create: formData.players.map((player) => ({
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
        include: {
          players: true,
          teamLeader: true,
          teamMembers: true,
        },
      });

      if (!registration) {
        throw new Error("Failed to create registration");
      }

      return { success: true, data: registration };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create registration",
      };
    }
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to process registration" };
  }
}
