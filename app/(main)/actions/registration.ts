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
      "Python Frontiers": EventType.PYTHON_FRONTIERS,
      BGMI: EventType.BGMI,
      FreeFire: EventType.FREEFIRE,
      "AI Tales": EventType.AI_TALES,
      "ENTC Project Expo": EventType.ENTC_PROJECT_EXPO,
      "Digital Dangal": EventType.ENTC_DIGITAL_DANGAL,
      "Snap & Shine": EventType.ENTC_SNAP_AND_SHINE,
      "Techno Science Quiz": EventType.GE_TECHNO_SCIENCE_QUIZ,
      "Poster Competition": EventType.GE_POSTER_COMPETITION,
      "SciTech Model Expo 2K26": EventType.GE_SCITECH_MODEL_EXPO,
      "General Engineering Games": EventType.GE_GAMES_BUNDLE,
      "Model Making": EventType.CE_MODEL_MAKING,
      "CAD Master": EventType.CE_CAD_MASTER,
      Videography: EventType.CE_VIDEOGRAPHY,
      CODEFUSION: EventType.CSE_CODEFUSION,
      "Project Expo": EventType.CSE_PROJECT_EXPO,
      "Treasure Hunt": EventType.CSE_TREASURE_HUNT,
      // Mechanical events
      "Mech Project Expo": EventType.MECH_PROJECT_EXPO,
      "Mech Junk Yard": EventType.MECH_JUNK_YARD,
      "Mech IPL Auction": EventType.MECH_IPL_AUCTION,
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
          : eventName === "CODEFUSION" || eventName === "Digital Dangal"
            ? data.participant2
              ? 2
              : 1
            : eventName === "Project Expo"
              ? (data.numberOfTeamMembers ?? 2)
              : eventName === "Treasure Hunt"
                ? 1 +
                  [
                    data.participant2,
                    data.participant3,
                    data.participant4,
                    data.participant5,
                  ].filter((p) => p && p.studentName).length
                : 1;
      const fee = getEventFeeByName(eventName, teamSize);

      // Startup Sphere, BGMI, and FreeFire all use calculated fees
      if (
        eventName === "Startup Sphere" ||
        eventName === "BGMI" ||
        eventName === "FreeFire"
      ) {
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
      if (formData.events === "BGMI" || formData.events === "FreeFire") {
        console.log(`Creating ${formData.events} registration with data:`, {
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
            : formData.events === "Treasure Hunt"
              ? (() => {
                  const additionalParticipants = [
                    formData.participant2,
                    formData.participant3,
                    formData.participant4,
                    formData.participant5,
                  ].filter(
                    (p): p is NonNullable<typeof formData.participant2> =>
                      !!p && !!p.studentName
                  );

                  return {
                    ...baseData,
                    teamName: formData.teamName,
                    studentName: formData.studentName,
                    contactNumber: formData.contactNumber,
                    email: formData.email,
                    numberOfTeamMembers: 1 + additionalParticipants.length,
                    ...(additionalParticipants.length > 0 && {
                      teamMembers: {
                        create: additionalParticipants.map((p) => ({
                          studentName: p.studentName,
                          contactNumber: p.contactNumber || "",
                        })),
                      },
                    }),
                  };
                })()
              : formData.events === "BGMI" || formData.events === "FreeFire"
                ? {
                    ...baseData,
                    squadName: formData.squadName,
                    email: formData.players[0].email,
                    contactNumber: formData.players[0].contactNumber,
                    players: {
                      create: formData.players.map((player) => ({
                        playerName: player.playerName,
                        bgmiId: player.bgmiId,
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
                  : formData.events === "Project Expo"
                    ? (() => {
                        const total = formData.numberOfTeamMembers ?? 2;
                        const participants = [
                          formData.participant2,
                          formData.participant3,
                          formData.participant4,
                        ].slice(0, Math.max(0, total - 1));

                        // Basic server-side safety: required members must exist
                        if (total < 2 || total > 4) {
                          throw new Error(
                            "Project Expo team size must be between 2 and 4"
                          );
                        }
                        if (!participants[0]?.studentName) {
                          throw new Error(
                            "Project Expo requires at least 2 members"
                          );
                        }
                        if (total >= 3 && !participants[1]?.studentName) {
                          throw new Error(
                            "Project Expo requires member 3 details"
                          );
                        }
                        if (total >= 4 && !participants[2]?.studentName) {
                          throw new Error(
                            "Project Expo requires member 4 details"
                          );
                        }

                        return {
                          ...baseData,
                          studentName: formData.studentName,
                          contactNumber: formData.contactNumber,
                          email: formData.email,
                          numberOfTeamMembers: total,
                          teamMembers: {
                            create: participants.map((p) => ({
                              studentName: p!.studentName,
                              contactNumber: (p as any).contactNumber ?? "",
                            })),
                          },
                        };
                      })()
                    : formData.events === "CODEFUSION" ||
                        formData.events === "Digital Dangal"
                      ? {
                          ...baseData,
                          studentName: formData.studentName,
                          contactNumber: formData.contactNumber,
                          email: formData.email,
                          ...(formData.participant2 && {
                            teamMembers: {
                              create: [
                                {
                                  studentName:
                                    formData.participant2.studentName,
                                  contactNumber:
                                    formData.participant2.contactNumber,
                                  email: formData.participant2.email,
                                },
                              ],
                            },
                          }),
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
