import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import {
  AdminRole,
  EventType,
  Department,
} from "@/prisma/generated/prisma/client";

interface JWTPayload {
  sub: string;
  email: string;
  role: AdminRole;
  eventType: EventType | null;
  department: string | null;
}

const DEPARTMENT_EVENT_TYPES: Partial<Record<Department, EventType[]>> = {
  AIML: [EventType.FACE_TO_FACE, EventType.PYTHON_FRONTIERS, EventType.BGMI],
  GENERAL_ENGINEERING: [
    EventType.GE_TECHNO_SCIENCE_QUIZ,
    EventType.GE_POSTER_COMPETITION,
    EventType.GE_SCITECH_MODEL_EXPO,
    EventType.GE_GAMES_BUNDLE,
    EventType.FREEFIRE,
  ],
  CIVIL: [
    EventType.CE_MODEL_MAKING,
    EventType.CE_CAD_MASTER,
    EventType.CE_VIDEOGRAPHY,
  ],
  CSE: [
    EventType.CSE_CODEFUSION,
    EventType.CSE_PROJECT_EXPO,
    EventType.CSE_TREASURE_HUNT,
  ],
  ENTC: [
    EventType.ENTC_PROJECT_EXPO,
    EventType.ENTC_DIGITAL_DANGAL,
    EventType.ENTC_SNAP_AND_SHINE,
  ],
  MECHANICAL: [
    EventType.MECH_PROJECT_EXPO,
    EventType.MECH_JUNK_YARD,
    EventType.MECH_IPL_AUCTION,
  ],
};

// Clean sheet name: "CSE_CODEFUSION" → "CSE Codefusion" (max 31 chars for Excel)
function toSheetName(eventType: string): string {
  return eventType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 31);
}

// Squad events (BGMI, FreeFire)
function mapSquadReg(reg: any) {
  return {
    "Registration ID": reg.id,
    "College Name": reg.collegeName,
    "Squad Name": reg.squadName || "",
    Status: reg.status,
    "Payment Mode": reg.paymentMode || "",
    "Transaction ID": reg.transactionId || "",
    Amount: `₹${reg.amount}`,
    // Player 1 (Leader)
    "Player 1 Name": reg.players?.[0]?.playerName || "",
    "Player 1 Game ID": reg.players?.[0]?.bgmiId || "",
    "Player 1 Contact":
      reg.players?.[0]?.contactNumber || reg.contactNumber || "",
    // Player 2
    "Player 2 Name": reg.players?.[1]?.playerName || "",
    "Player 2 Game ID": reg.players?.[1]?.bgmiId || "",
    "Player 2 Contact": reg.players?.[1]?.contactNumber || "",
    // Player 3
    "Player 3 Name": reg.players?.[2]?.playerName || "",
    "Player 3 Game ID": reg.players?.[2]?.bgmiId || "",
    "Player 3 Contact": reg.players?.[2]?.contactNumber || "",
    // Player 4
    "Player 4 Name": reg.players?.[3]?.playerName || "",
    "Player 4 Game ID": reg.players?.[3]?.bgmiId || "",
    "Player 4 Contact": reg.players?.[3]?.contactNumber || "",
    "Verified By": reg.verifiedBy?.name || "Not Verified",
    "Verified At": reg.verifiedAt
      ? new Date(reg.verifiedAt).toLocaleString()
      : "",
    "Registered At": new Date(reg.registrationDate).toLocaleString(),
    Notes: reg.notes || "",
  };
}

// Team events (with teamLeader + teamMembers)
function mapTeamReg(reg: any) {
  return {
    "Registration ID": reg.id,
    "College Name": reg.collegeName,
    "Team Name": reg.teamName || "",
    "Team Size": reg.numberOfTeamMembers || "",
    Status: reg.status,
    "Payment Mode": reg.paymentMode || "",
    "Transaction ID": reg.transactionId || "",
    Amount: `₹${reg.amount}`,
    // Leader
    "Leader Name": reg.teamLeader?.studentName || reg.studentName || "",
    "Leader Contact": reg.teamLeader?.contactNumber || reg.contactNumber || "",
    "Leader Email": reg.teamLeader?.email || reg.email || "",
    // Members
    "Member 1 Name": reg.teamMembers?.[0]?.studentName || "",
    "Member 1 Contact": reg.teamMembers?.[0]?.contactNumber || "",
    "Member 1 Email": reg.teamMembers?.[0]?.email || "",
    "Member 2 Name": reg.teamMembers?.[1]?.studentName || "",
    "Member 2 Contact": reg.teamMembers?.[1]?.contactNumber || "",
    "Member 2 Email": reg.teamMembers?.[1]?.email || "",
    "Member 3 Name": reg.teamMembers?.[2]?.studentName || "",
    "Member 3 Contact": reg.teamMembers?.[2]?.contactNumber || "",
    "Member 3 Email": reg.teamMembers?.[2]?.email || "",
    "Member 4 Name": reg.teamMembers?.[3]?.studentName || "",
    "Member 4 Contact": reg.teamMembers?.[3]?.contactNumber || "",
    "Member 4 Email": reg.teamMembers?.[3]?.email || "",
    "Verified By": reg.verifiedBy?.name || "Not Verified",
    "Verified At": reg.verifiedAt
      ? new Date(reg.verifiedAt).toLocaleString()
      : "",
    "Registered At": new Date(reg.registrationDate).toLocaleString(),
    Notes: reg.notes || "",
  };
}

// Solo events
function mapSoloReg(reg: any) {
  return {
    "Registration ID": reg.id,
    "College Name": reg.collegeName,
    "Student Name": reg.studentName || "",
    "Contact Number": reg.contactNumber || "",
    Email: reg.email || "",
    Status: reg.status,
    "Payment Mode": reg.paymentMode || "",
    "Transaction ID": reg.transactionId || "",
    Amount: `₹${reg.amount}`,
    "Verified By": reg.verifiedBy?.name || "Not Verified",
    "Verified At": reg.verifiedAt
      ? new Date(reg.verifiedAt).toLocaleString()
      : "",
    "Registered At": new Date(reg.registrationDate).toLocaleString(),
    Notes: reg.notes || "",
  };
}

const SQUAD_EVENTS = ["BGMI", "FREEFIRE", "GE_GAMES_BUNDLE"];
const TEAM_EVENTS = [
  "FACE_TO_FACE",
  "PYTHON_FRONTIERS",
  "ENTC_PROJECT_EXPO",
  "ENTC_DIGITAL_DANGAL",
  "CSE_CODEFUSION",
  "CSE_PROJECT_EXPO",
  "CSE_TREASURE_HUNT",
  "CE_MODEL_MAKING",
  "CE_CAD_MASTER",
  "CE_VIDEOGRAPHY",
  "CE_BATTLE_OF_BRAINS",
  "MECH_PROJECT_EXPO",
  "MECH_JUNK_YARD",
  "MECH_IPL_AUCTION",
  "GE_SCITECH_MODEL_EXPO",
];

function mapReg(reg: any) {
  if (SQUAD_EVENTS.includes(reg.eventType)) return mapSquadReg(reg);
  if (TEAM_EVENTS.includes(reg.eventType)) return mapTeamReg(reg);
  return mapSoloReg(reg);
}

function appendSheet(wb: XLSX.WorkBook, data: any[], sheetName: string) {
  if (!data.length) return;
  const ws = XLSX.utils.json_to_sheet(data);
  ws["!cols"] = Object.keys(data[0]).map(() => ({ wch: 22 }));
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventTypeParam = searchParams.get("eventType");
    const department = searchParams.get("department");
    const paymentMode = searchParams.get("paymentMode");
    const search = searchParams.get("search");

    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const payload = verified.payload as unknown as JWTPayload;

    const where: Record<string, unknown> = {};

    if (payload.role === AdminRole.EVENT_ADMIN && payload.eventType) {
      where.eventType = payload.eventType;
    } else {
      if (eventTypeParam && eventTypeParam !== "all") {
        where.eventType = eventTypeParam as EventType;
      }

      const departmentForFilter =
        department &&
        department !== "all" &&
        payload.role === AdminRole.SUPER_ADMIN
          ? (department as Department)
          : payload.role === AdminRole.DEPARTMENT_ADMIN && payload.department
            ? (payload.department as Department)
            : null;

      if (departmentForFilter) {
        let eventTypesForDept: EventType[] = [];
        try {
          const eventsForDept = await prisma.event.findMany({
            where: { department: departmentForFilter },
            select: { eventType: true },
          });
          eventTypesForDept = eventsForDept.map((e) => e.eventType);
        } catch {
          eventTypesForDept = [];
        }
        if (
          !eventTypesForDept.length &&
          DEPARTMENT_EVENT_TYPES[departmentForFilter]
        ) {
          eventTypesForDept = DEPARTMENT_EVENT_TYPES[departmentForFilter]!;
        }
        if (eventTypesForDept.length) {
          where.eventType = { in: eventTypesForDept };
        }
      }
    }

    if (paymentMode && paymentMode !== "all") {
      where.paymentMode = paymentMode;
    }

    if (search) {
      where.OR = [
        { collegeName: { contains: search, mode: "insensitive" } },
        { studentName: { contains: search, mode: "insensitive" } },
        { teamName: { contains: search, mode: "insensitive" } },
        { squadName: { contains: search, mode: "insensitive" } },
      ];
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        teamLeader: true,
        teamMembers: true,
        players: true,
        verifiedBy: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Group by eventType
    const grouped = registrations.reduce(
      (acc, reg) => {
        if (!acc[reg.eventType]) acc[reg.eventType] = [];
        acc[reg.eventType].push(reg);
        return acc;
      },
      {} as Record<string, typeof registrations>
    );

    const wb = XLSX.utils.book_new();

    // Sort event types alphabetically for consistent sheet order
    Object.keys(grouped)
      .sort()
      .forEach((eventType) => {
        const data = grouped[eventType].map(mapReg);
        appendSheet(wb, data, toSheetName(eventType));
      });

    // Nothing matched filters
    if (!Object.keys(grouped).length) {
      const ws = XLSX.utils.json_to_sheet([
        { Message: "No registrations found for the selected filters." },
      ]);
      XLSX.utils.book_append_sheet(wb, ws, "No Data");
    }

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=registrations-${new Date().toISOString().split("T")[0]}.xlsx`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export registrations" },
      { status: 500 }
    );
  }
}
