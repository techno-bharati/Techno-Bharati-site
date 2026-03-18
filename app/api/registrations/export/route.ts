import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import {
  AdminRole,
  EventType,
  Department,
  Registration,
  TeamMember,
  Player,
} from "@/prisma/generated/prisma/client";
import { Prisma } from "@/prisma/generated/prisma/client";

interface JWTPayload {
  sub: string;
  email: string;
  role: AdminRole;
  eventType: EventType | null;
  department: Department | null;
}

type VerifiedBy = { name: string | null; email: string } | null;

type RegistrationWithRelations = Registration & {
  players: Player[];
  teamMembers: TeamMember[];
  teamLeader: TeamMember | null;
  verifiedBy: VerifiedBy;
};

const DEPARTMENT_EVENT_TYPES: Partial<Record<Department, EventType[]>> = {
  AIML: [
    EventType.FACE_TO_FACE,
    EventType.PYTHON_FRONTIERS,
    EventType.BGMI,
    EventType.AI_TALES,
    EventType.STARTUP_SPHERE,
  ],
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
    EventType.CE_BATTLE_OF_BRAINS,
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

const SQUAD_EVENT_TYPES = new Set<EventType>([
  EventType.BGMI,
  EventType.FREEFIRE,
]);

const TEAM_EVENT_TYPES = new Set<EventType>([
  EventType.STARTUP_SPHERE,
  EventType.ENTC_PROJECT_EXPO,
  EventType.ENTC_DIGITAL_DANGAL,
  EventType.CSE_CODEFUSION,
  EventType.CSE_PROJECT_EXPO,
  EventType.CSE_TREASURE_HUNT,
  EventType.CE_MODEL_MAKING,
  EventType.CE_CAD_MASTER,
  EventType.CE_VIDEOGRAPHY,
  EventType.CE_BATTLE_OF_BRAINS,
  EventType.MECH_PROJECT_EXPO,
  EventType.MECH_JUNK_YARD,
  EventType.MECH_IPL_AUCTION,
  EventType.GE_SCITECH_MODEL_EXPO,
  EventType.GE_POSTER_COMPETITION,
]);

function toSheetName(eventType: string): string {
  return eventType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 31); // Excel sheet name limit
}

function mapSquadReg(reg: RegistrationWithRelations): Record<string, string> {
  const p = reg.players;
  return {
    "College Name": reg.collegeName,
    Year: reg.class ?? "",
    "Squad Name": reg.squadName ?? "",
    "Payment Mode": reg.paymentMode,
    "Transaction ID / Receipt Number": reg.transactionId?.toString() ?? "",
    Amount: `₹${reg.amount}`,
    // player 1 (Squad Leader)
    "Player 1 Name": p[0]?.playerName ?? "",
    "Player 1 Game ID": p[0]?.bgmiId ?? "",
    "Player 1 Contact": p[0]?.contactNumber ?? reg.contactNumber ?? "",
    // player 2
    "Player 2 Name": p[1]?.playerName ?? "",
    "Player 2 Game ID": p[1]?.bgmiId ?? "",
    "Player 2 Contact": p[1]?.contactNumber ?? "",
    // player 3
    "Player 3 Name": p[2]?.playerName ?? "",
    "Player 3 Game ID": p[2]?.bgmiId ?? "",
    "Player 3 Contact": p[2]?.contactNumber ?? "",
    // player 4
    "Player 4 Name": p[3]?.playerName ?? "",
    "Player 4 Game ID": p[3]?.bgmiId ?? "",
    "Player 4 Contact": p[3]?.contactNumber ?? "",
    "Registered At": new Date(reg.registrationDate).toLocaleString(),
    Notes: reg.notes ?? "",
  };
}

function mapTeamReg(reg: RegistrationWithRelations): Record<string, string> {
  const m = reg.teamMembers;
  return {
    "College Name": reg.collegeName,
    Year: reg.class ?? "",
    "Team Name": reg.teamName ?? "",
    "Team Size": reg.numberOfTeamMembers?.toString() ?? "",
    Status: reg.status,
    "Payment Mode": reg.paymentMode,
    "Transaction ID / Receipt Number": reg.transactionId?.toString() ?? "",
    Amount: `₹${reg.amount}`,
    // leader — prefer teamLeader relation; fall back to registration-level fields
    "Leader Name": reg.teamLeader?.studentName ?? reg.studentName ?? "",
    "Leader Contact": reg.teamLeader?.contactNumber ?? reg.contactNumber ?? "",
    "Leader Email": reg.teamLeader?.email ?? reg.email ?? "",
    // members
    "Member 1 Name": m[0]?.studentName ?? "",
    "Member 1 Contact": m[0]?.contactNumber ?? "",
    "Member 1 Email": m[0]?.email ?? "",
    "Member 2 Name": m[1]?.studentName ?? "",
    "Member 2 Contact": m[1]?.contactNumber ?? "",
    "Member 2 Email": m[1]?.email ?? "",
    "Member 3 Name": m[2]?.studentName ?? "",
    "Member 3 Contact": m[2]?.contactNumber ?? "",
    "Member 3 Email": m[2]?.email ?? "",
    "Member 4 Name": m[3]?.studentName ?? "",
    "Member 4 Contact": m[3]?.contactNumber ?? "",
    "Member 4 Email": m[3]?.email ?? "",
    "Registered At": new Date(reg.registrationDate).toLocaleString(),
    Notes: reg.notes ?? "",
  };
}

function mapSoloReg(reg: RegistrationWithRelations): Record<string, string> {
  return {
    "College Name": reg.collegeName,
    Year: reg.class ?? "",
    "Student Name": reg.studentName ?? "",
    "Contact Number": reg.contactNumber ?? "",
    Email: reg.email ?? "",
    Status: reg.status,
    "Payment Mode": reg.paymentMode,
    "Transaction ID / Receipt Number": reg.transactionId?.toString() ?? "",
    Amount: `₹${reg.amount}`,
    "Verified By": reg.verifiedBy?.name ?? "Not Verified",
    "Registered At": new Date(reg.registrationDate).toLocaleString(),
    Notes: reg.notes ?? "",
  };
}

function mapReg(reg: RegistrationWithRelations): Record<string, string> {
  if (SQUAD_EVENT_TYPES.has(reg.eventType)) return mapSquadReg(reg);
  if (TEAM_EVENT_TYPES.has(reg.eventType)) return mapTeamReg(reg);
  return mapSoloReg(reg);
}

function appendSheet(
  wb: XLSX.WorkBook,
  data: Record<string, string>[],
  sheetName: string
): void {
  if (!data.length) return;
  const ws = XLSX.utils.json_to_sheet(data);
  ws["!cols"] = Object.keys(data[0]).map(() => ({ wch: 22 }));
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const eventTypeParam = searchParams.get("eventType");
    const departmentParam = searchParams.get("department");
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

    const where: Prisma.RegistrationWhereInput = {};

    if (payload.role === AdminRole.EVENT_ADMIN && payload.eventType) {
      where.eventType = payload.eventType;
    } else {
      if (eventTypeParam && eventTypeParam !== "all") {
        where.eventType = eventTypeParam as EventType;
      }

      const resolvedDept: Department | null =
        payload.role === AdminRole.SUPER_ADMIN &&
        departmentParam &&
        departmentParam !== "all"
          ? (departmentParam as Department)
          : payload.role === AdminRole.DEPARTMENT_ADMIN && payload.department
            ? payload.department
            : null;

      if (resolvedDept) {
        let eventTypesForDept: EventType[] = [];
        try {
          const rows = await prisma.event.findMany({
            where: { department: resolvedDept },
            select: { eventType: true },
          });
          eventTypesForDept = rows.map((r) => r.eventType);
        } catch {
          eventTypesForDept = [];
        }

        if (!eventTypesForDept.length) {
          eventTypesForDept = DEPARTMENT_EVENT_TYPES[resolvedDept] ?? [];
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

    const registrations = (await prisma.registration.findMany({
      where,
      include: {
        teamLeader: true,
        teamMembers: true,
        players: true,
        verifiedBy: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    })) satisfies RegistrationWithRelations[];

    const grouped = registrations.reduce<
      Record<string, RegistrationWithRelations[]>
    >((acc, reg) => {
      (acc[reg.eventType] ??= []).push(reg);
      return acc;
    }, {});

    const wb = XLSX.utils.book_new();

    Object.keys(grouped)
      .sort()
      .forEach((eventType) => {
        const data = grouped[eventType].map(mapReg);
        appendSheet(wb, data, toSheetName(eventType));
      });

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
        "Content-Disposition": `attachment; filename=registrations-${
          new Date().toISOString().split("T")[0]
        }.xlsx`,
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
