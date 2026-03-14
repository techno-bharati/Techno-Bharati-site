import type { EventName } from "@/lib/types/registration";
import { EVENT_FEES } from "@/lib/constants";

type QRDepartment = "aiml" | "cse" | "mech" | "civil" | "entc" | "ge";

const EVENT_NAME_TO_FEE_KEY: Partial<
  Record<EventName, keyof typeof EVENT_FEES>
> = {
  "Startup Sphere": "STARTUP_SPHERE",
  "Face To Face": "FACE_TO_FACE",
  "Python Frontiers": "PYTHON_FRONTIERS",
  "AI Tales": "AI_TALES",
  BGMI: "BGMI",
  FreeFire: "FREEFIRE",
  CODEFUSION: "CSE_CODEFUSION",
  "Project Expo": "CSE_PROJECT_EXPO",
  "Treasure Hunt": "CSE_TREASURE_HUNT",
  "ENTC Project Expo": "ENTC_PROJECT_EXPO",
  "Digital Dangal": "ENTC_DIGITAL_DANGAL",
  "Snap & Shine": "ENTC_SNAP_AND_SHINE",
  "Techno Science Quiz": "GE_TECHNO_SCIENCE_QUIZ",
  "Poster Competition": "GE_POSTER_COMPETITION",
  "SciTech Model Expo 2K26": "GE_SCITECH_MODEL_EXPO",
  "General Engineering Games": "GE_GAMES_BUNDLE",
  "Model Making": "CE_MODEL_MAKING",
  "Battle of Brains": "CE_BATTLE_OF_BRAINS",
  "CAD Master": "CE_CAD_MASTER",
  Videography: "CE_VIDEOGRAPHY",
  "Mech Project Expo": "MECH_PROJECT_EXPO",
  "Mech Junk Yard": "MECH_JUNK_YARD",
  "Mech IPL Auction": "MECH_IPL_AUCTION",
};

const EVENT_QR_DEPARTMENT: Partial<Record<EventName, QRDepartment>> = {
  "Startup Sphere": "aiml",
  "Face To Face": "aiml",
  "Python Frontiers": "aiml",
  "AI Tales": "aiml",
  BGMI: "aiml",
  CODEFUSION: "cse",
  "Project Expo": "cse",
  "Treasure Hunt": "cse",
  "ENTC Project Expo": "entc",
  "Digital Dangal": "entc",
  "Snap & Shine": "entc",
  "Techno Science Quiz": "ge",
  "Poster Competition": "ge",
  "SciTech Model Expo 2K26": "ge",
  "General Engineering Games": "ge",
  FreeFire: "ge",
  "Model Making": "civil",
  "Battle of Brains": "civil",
  "CAD Master": "civil",
  Videography: "civil",
  "Mech Project Expo": "mech",
  "Mech Junk Yard": "mech",
  "Mech IPL Auction": "mech",
};

const SINGLE_QR_DEPARTMENTS = new Set<QRDepartment>(["civil", "entc"]);

const VALID_AMOUNTS = [100, 200, 300, 400, 500] as const;

export function getQRCodePath(event: EventName, participants: number): string {
  const dept = EVENT_QR_DEPARTMENT[event];
  if (!dept) return `/qr/0.jpeg`;

  if (SINGLE_QR_DEPARTMENTS.has(dept)) return `/qr/${dept}/0.jpeg`;

  const feeKey = EVENT_NAME_TO_FEE_KEY[event];
  const feeConfig = feeKey ? EVENT_FEES[feeKey] : undefined;

  if (!feeConfig) return `/qr/${dept}/0.jpeg`;

  if (feeConfig.type === "per team") {
    const amount = feeConfig.amount;
    return VALID_AMOUNTS.includes(amount as (typeof VALID_AMOUNTS)[number])
      ? `/qr/${dept}/${amount}.jpeg`
      : `/qr/${dept}/0.jpeg`;
  }

  const totalAmount = feeConfig.amount * participants;
  const resolvedAmount = VALID_AMOUNTS.includes(
    totalAmount as (typeof VALID_AMOUNTS)[number]
  )
    ? totalAmount
    : 0;

  return `/qr/${dept}/${resolvedAmount}.jpeg`;
}
