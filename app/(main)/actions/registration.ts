"use server";

import prisma from "@/lib/prisma";
import { userRegistrationFormSchema } from "@/schema/userRegistrationForm";
import { z } from "zod";
import { uploadImage } from "@/lib/uploadImage";
import {
  calculateGeneralEngineeringGamesFee,
  GENERAL_ENGINEERING_TECHNICAL_FEE,
  CIVIL_TECHNICAL_FEE,
  getEventFeeByName,
} from "@/lib/constants";
import { EventType, Department } from "@/prisma/generated/prisma/client";

export async function createRegistration(
  formData: z.infer<typeof userRegistrationFormSchema>
) {
  try {
    const uploadResult = await uploadImage(formData.payss);
    if (!uploadResult.success) {
      return { success: false, error: "Failed to upload payment screenshot" };
    }

    const eventTypeMap = {
      "Startup Sphere": EventType.STARTUP_SPHERE,
      "Face To Face": EventType.FACE_TO_FACE,
      "Python Worriors": EventType.PYTHON_WARRIORS,
      "FreeFire Battleship": EventType.FREEFIRE_BATTLESHIP,
      "AI Tales": EventType.AI_TALES,
      "Techno Science Quiz": EventType.GE_TECHNO_SCIENCE_QUIZ,
      "Poster Competition": EventType.GE_POSTER_COMPETITION,
      "SciTech Model Expo 2K26": EventType.GE_SCITECH_MODEL_EXPO,
      "General Engineering Games": EventType.GE_GAMES_BUNDLE,
      "Model Making": EventType.CE_MODEL_MAKING,
      "CAD Master": EventType.CE_CAD_MASTER,
      Videography: EventType.CE_VIDEOGRAPHY,
      CODEFUSION: EventType.CSE_CODEFUSION,
      "Project Expo": EventType.CSE_PROJECT_EXPO,
      "Counter Strike": EventType.CSE_COUNTER_STRIKE,
    } as const;

    const calculateTotalFee = (data: typeof formData) => {
      const eventName = data.events;
      if (eventName === "General Engineering Games") {
        return calculateGeneralEngineeringGamesFee(data.selectedGames.length);
      }
      if (
        eventName === "Techno Science Quiz" ||
        eventName === "Poster Competition" ||
        eventName === "SciTech Model Expo 2K26"
      ) {
        return GENERAL_ENGINEERING_TECHNICAL_FEE;
      }
      if (
        eventName === "Model Making" ||
        eventName === "CAD Master" ||
        eventName === "Videography"
      ) {
        return CIVIL_TECHNICAL_FEE;
      }
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

    const departmentMap: Record<
      z.infer<typeof userRegistrationFormSchema>["department"],
      string
    > = {
      AIML: Department.AIML,
      CSE: Department.CSE,
      MECHANICAL: Department.MECHANICAL,
      CIVIL: Department.CIVIL,
      ENTC: Department.ENTC,
      OTHER: Department.OTHER,
    };

    const baseData = {
      collegeName: formData.collegeName,
      eventType: eventTypeMap[formData.events],
      paymentScreenshot: uploadResult.url!,
      paymentMode: formData.paymentMode,
      amount,
      department: departmentMap[formData.department] as Department,
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
              : formData.events === "General Engineering Games"
                ? {
                    ...baseData,
                    studentName: formData.studentName,
                    contactNumber: formData.contactNumber,
                    email: formData.email,
                    notes: `GE Games: ${formData.selectedGames.join(", ")}${
                      formData.groupName
                        ? ` | Group: ${formData.groupName}`
                        : ""
                    }`,
                  }
                : formData.events === "Model Making" ||
                    formData.events === "CAD Master" ||
                    formData.events === "Videography"
                  ? {
                      ...baseData,
                      studentName: formData.studentName,
                      contactNumber: formData.contactNumber,
                      email: formData.email,
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
