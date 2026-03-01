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

type FormData = z.infer<typeof userRegistrationFormSchema>;

type StartupSphereData = Extract<FormData, { events: "Startup Sphere" }>;
type BGMIData = Extract<FormData, { events: "BGMI" }>;
type FreeFireData = Extract<FormData, { events: "FreeFire" }>;
type TreasureHuntData = Extract<FormData, { events: "Treasure Hunt" }>;
type ProjectExpoData = Extract<FormData, { events: "Project Expo" }>;
type CodefusionData = Extract<FormData, { events: "CODEFUSION" }>;
type DigitalDangalData = Extract<FormData, { events: "Digital Dangal" }>;
type BattleOfBrainsData = Extract<FormData, { events: "Battle of Brains" }>;
type VideographyData = Extract<FormData, { events: "Videography" }>;
type GEGamesData = Extract<FormData, { events: "General Engineering Games" }>;
type MechJunkYardData = Extract<FormData, { events: "Mech Junk Yard" }>;
type MechIplAuctionData = Extract<FormData, { events: "Mech IPL Auction" }>;
type MechProjectExpoData = Extract<FormData, { events: "Mech Project Expo" }>;
type EntcProjectExpoData = Extract<FormData, { events: "ENTC Project Expo" }>;

type CreateRegistrationInput = Omit<FormData, "payss"> & {
  payss?: File;
  paymentScreenshotUrl?: string;
};

const eventTypeMap: Record<FormData["events"], EventType> = {
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
  "Battle of Brains": EventType.CE_BATTLE_OF_BRAINS,
  "CAD Master": EventType.CE_CAD_MASTER,
  Videography: EventType.CE_VIDEOGRAPHY,
  CODEFUSION: EventType.CSE_CODEFUSION,
  "Project Expo": EventType.CSE_PROJECT_EXPO,
  "Treasure Hunt": EventType.CSE_TREASURE_HUNT,
  "Mech Project Expo": EventType.MECH_PROJECT_EXPO,
  "Mech Junk Yard": EventType.MECH_JUNK_YARD,
  "Mech IPL Auction": EventType.MECH_IPL_AUCTION,
};

const departmentMap: Record<FormData["department"], Department> = {
  AIML: Department.AIML,
  CSE: Department.CSE,
  MECHANICAL: Department.MECHANICAL,
  CIVIL: Department.CIVIL,
  ENTC: Department.ENTC,
  OTHER: Department.OTHER,
};

function calculateTotalFee(data: FormData): number {
  const { events } = data;

  if (events === "General Engineering Games") {
    return calculateGeneralEngineeringGamesFee(
      (data as GEGamesData).selectedGames.length
    );
  }

  if (
    events === "Techno Science Quiz" ||
    events === "Poster Competition" ||
    events === "SciTech Model Expo 2K26"
  ) {
    return GENERAL_ENGINEERING_TECHNICAL_FEE;
  }

  if (events === "Model Making" || events === "CAD Master") {
    return CIVIL_TECHNICAL_FEE;
  }

  if (events === "Battle of Brains" || events === "Videography") {
    return getEventFeeByName(events, 2) ?? 0;
  }

  if (events === "Startup Sphere") {
    const d = data as StartupSphereData;
    const teamSize = (d.teamMembers?.length ?? 0) + 1;
    return getEventFeeByName(events, teamSize) ?? 0;
  }

  if (events === "BGMI" || events === "FreeFire") {
    return getEventFeeByName(events, 4) ?? 0;
  }

  if (events === "CODEFUSION" || events === "Digital Dangal") {
    const d = data as CodefusionData | DigitalDangalData;
    const teamSize = d.participant2 ? 2 : 1;
    return getEventFeeByName(events, teamSize) ?? 0;
  }

  if (events === "Project Expo") {
    const d = data as ProjectExpoData;
    return getEventFeeByName(events, d.numberOfTeamMembers) ?? 0;
  }

  if (events === "Treasure Hunt") {
    const d = data as TreasureHuntData;
    const extra = [
      d.participant2,
      d.participant3,
      d.participant4,
      d.participant5,
    ].filter((p) => p && p.studentName).length;
    return getEventFeeByName(events, 1 + extra) ?? 0;
  }

  if (events === "Mech Junk Yard") {
    const d = data as MechJunkYardData;
    return getEventFeeByName(events, d.numberOfTeamMembers) ?? 0;
  }

  if (events === "Mech IPL Auction") {
    const d = data as MechIplAuctionData;
    return getEventFeeByName(events, d.numberOfTeamMembers) ?? 0;
  }

  if (events === "Mech Project Expo") {
    const d = data as MechProjectExpoData;
    return getEventFeeByName(events, d.numberOfTeamMembers) ?? 0;
  }

  if (events === "ENTC Project Expo") {
    const d = data as EntcProjectExpoData;
    return getEventFeeByName(events, d.numberOfTeamMembers) ?? 0;
  }

  return getEventFeeByName(events, 1) ?? 0;
}

export async function createRegistration(formData: CreateRegistrationInput) {
  try {
    let paymentScreenshotUrl: string;
    if (formData.paymentScreenshotUrl) {
      paymentScreenshotUrl = formData.paymentScreenshotUrl;
    } else if (formData.payss) {
      const uploadResult = await uploadImage(formData.payss);
      if (!uploadResult.success) {
        return { success: false, error: "Failed to upload payment screenshot" };
      }
      paymentScreenshotUrl = uploadResult.url!;
    } else {
      return { success: false, error: "Payment screenshot is required" };
    }

    const data = formData as FormData;

    const amount = calculateTotalFee(data);

    const baseData = {
      collegeName: data.collegeName,
      eventType: eventTypeMap[data.events],
      paymentScreenshot: paymentScreenshotUrl,
      paymentMode: data.paymentMode,
      transactionId:
        data.paymentMode === "ONLINE" && data.transactionId != null
          ? String(data.transactionId)
          : null,
      amount,
      department: departmentMap[data.department],
      class: data.class,
    };

    try {
      const registration = await prisma.registration.create({
        data: buildRegistrationData(data, baseData),
        select: { id: true },
      });

      if (!registration) throw new Error("Failed to create registration");

      return { success: true, data: { id: registration.id } };
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

type BaseData = {
  collegeName: string;
  eventType: EventType;
  paymentScreenshot: string;
  paymentMode: string;
  transactionId: string | null;
  amount: number;
  department: Department;
  class: string;
};

function buildRegistrationData(data: FormData, baseData: BaseData) {
  switch (data.events) {
    case "Startup Sphere": {
      const d = data as StartupSphereData;
      return {
        ...baseData,
        startupCategory: d.startupCategory,
        numberOfTeamMembers: d.numberOfTeamMembers,
        teamName: d.teamName,
        teamLeader: {
          create: {
            studentName: d.teamLeader.studentName,
            contactNumber: d.teamLeader.contactNumber,
            email: d.teamLeader.email,
          },
        },
        ...(d.teamMembers &&
          d.teamMembers.length > 0 && {
            teamMembers: {
              create: d.teamMembers.map((m) => ({
                studentName: m.studentName!,
                contactNumber: m.contactNumber!,
                email: m.email,
              })),
            },
          }),
      };
    }

    case "BGMI":
    case "FreeFire": {
      const d = data as BGMIData | FreeFireData;
      return {
        ...baseData,
        squadName: d.squadName,
        email: d.players[0].email,
        contactNumber: d.players[0].contactNumber,
        players: {
          create: d.players.map((p) => ({
            playerName: p.playerName,
            bgmiId: p.bgmiId,
            contactNumber: p.contactNumber,
          })),
        },
      };
    }

    case "Treasure Hunt": {
      const d = data as TreasureHuntData;
      const extras = [
        d.participant2,
        d.participant3,
        d.participant4,
        d.participant5,
      ].filter((p): p is NonNullable<typeof p> => !!p && !!p.studentName);
      return {
        ...baseData,
        teamName: d.teamName,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        numberOfTeamMembers: 1 + extras.length,
        ...(extras.length > 0 && {
          teamMembers: {
            create: extras.map((p) => ({
              studentName: p.studentName,
              contactNumber: p.contactNumber ?? "",
            })),
          },
        }),
      };
    }

    case "Project Expo": {
      const d = data as ProjectExpoData;
      const total = d.numberOfTeamMembers;

      if (total < 2 || total > 4)
        throw new Error("Project Expo team size must be 2–4");
      if (!d.participant2?.studentName)
        throw new Error("Project Expo requires at least 2 members");
      if (total >= 3 && !d.participant3?.studentName)
        throw new Error("Project Expo requires member 3");
      if (total >= 4 && !d.participant4?.studentName)
        throw new Error("Project Expo requires member 4");

      const members = [d.participant2, d.participant3, d.participant4]
        .slice(0, total - 1)
        .filter((p): p is NonNullable<typeof p> => !!p?.studentName);

      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        numberOfTeamMembers: total,
        teamMembers: {
          create: members.map((p) => ({
            studentName: p.studentName,
            contactNumber: p.contactNumber ?? "",
          })),
        },
      };
    }

    case "CODEFUSION":
    case "Digital Dangal": {
      const d = data as CodefusionData | DigitalDangalData;
      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        ...(d.participant2 && {
          teamMembers: {
            create: [
              {
                studentName: d.participant2.studentName,
                contactNumber: d.participant2.contactNumber ?? "",
                email: d.participant2.email,
              },
            ],
          },
        }),
      };
    }

    case "Battle of Brains":
    case "Videography": {
      const d = data as BattleOfBrainsData | VideographyData;
      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        teamName: d.teamName,
        teamMembers: {
          create: [
            {
              studentName: d.participant2.studentName,
              contactNumber: d.participant2.contactNumber,
              email: d.participant2.email,
            },
          ],
        },
      };
    }

    case "General Engineering Games": {
      const d = data as GEGamesData;
      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        notes: `GE Games: ${d.selectedGames.join(", ")}${
          d.groupName ? ` | Group: ${d.groupName}` : ""
        }`,
      };
    }

    case "Mech Project Expo": {
      const d = data as MechProjectExpoData;
      const total = d.numberOfTeamMembers;
      const members = [
        d.participant2,
        d.participant3,
        d.participant4,
        d.participant5,
      ]
        .slice(0, total - 1)
        .filter((p): p is NonNullable<typeof p> => !!p?.studentName);

      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        teamName: d.teamName,
        numberOfTeamMembers: total,
        teamMembers: {
          create: members.map((p) => ({
            studentName: p.studentName,
            contactNumber: p.contactNumber ?? "",
          })),
        },
      };
    }

    case "Mech Junk Yard": {
      const d = data as MechJunkYardData;
      const total = d.numberOfTeamMembers;
      const members = [d.participant2, d.participant3]
        .slice(0, total - 1)
        .filter((p): p is NonNullable<typeof p> => !!p?.studentName);

      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        teamName: d.teamName,
        numberOfTeamMembers: total,
        teamMembers: {
          create: members.map((p) => ({
            studentName: p.studentName,
            contactNumber: p.contactNumber ?? "",
          })),
        },
      };
    }

    case "Mech IPL Auction":
    case "ENTC Project Expo": {
      const d = data as MechIplAuctionData | EntcProjectExpoData;
      const total = d.numberOfTeamMembers;
      const members = [d.participant2, d.participant3, d.participant4]
        .slice(0, total - 1)
        .filter((p): p is NonNullable<typeof p> => !!p?.studentName);

      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
        teamName: d.teamName,
        numberOfTeamMembers: total,
        teamMembers: {
          create: members.map((p) => ({
            studentName: p.studentName,
            contactNumber: p.contactNumber ?? "",
          })),
        },
      };
    }

    default: {
      const d = data as Extract<
        FormData,
        {
          studentName: string;
          contactNumber: string;
          email: string;
        }
      >;
      return {
        ...baseData,
        studentName: d.studentName,
        contactNumber: d.contactNumber,
        email: d.email,
      };
    }
  }
}
