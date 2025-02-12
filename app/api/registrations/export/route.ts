import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        teamLeader: true,
        teamMembers: true,
        players: true,
        verifiedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const wb = XLSX.utils.book_new();

    const groupedRegistrations = registrations.reduce((acc, reg) => {
      if (!acc[reg.eventType]) {
        acc[reg.eventType] = [];
      }
      acc[reg.eventType].push(reg);
      return acc;
    }, {} as Record<string, typeof registrations>);

    if (groupedRegistrations.STARTUP_SPHERE?.length) {
      const startupData = groupedRegistrations.STARTUP_SPHERE.map((reg) => ({
        "Registration ID": reg.id,
        "College Name": reg.collegeName,
        "Registration Date": new Date(reg.registrationDate).toLocaleString(),
        Status: reg.status,
        "Payment Status": reg.paymentStatus,
        Amount: `₹${reg.amount}`,
        Category: reg.startupCategory,
        "Team Name": reg.teamName,
        "Team Size": reg.numberOfTeamMembers,
        // team Leader Details
        "Team Leader Name": reg.teamLeader?.studentName || "",
        "Team Leader Contact": reg.teamLeader?.contactNumber || "",
        "Team Leader Email": reg.teamLeader?.email || "",
        // Team members Details (separate columns for each member)
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
        "Verification Date": reg.verifiedAt
          ? new Date(reg.verifiedAt).toLocaleString()
          : "Not Verified",
        Notes: reg.notes || "",
      }));

      const wsStartup = XLSX.utils.json_to_sheet(startupData);
      wsStartup["!cols"] = Object.keys(startupData[0] || {}).map(() => ({
        wch: 20,
      }));
      XLSX.utils.book_append_sheet(wb, wsStartup, "Startup Sphere");
    }

    // Process FreeFire Battleship registrations
    if (groupedRegistrations.FREEFIRE_BATTLESHIP?.length) {
      const freeFireData = groupedRegistrations.FREEFIRE_BATTLESHIP.map(
        (reg) => ({
          "Registration ID": reg.id,
          "College Name": reg.collegeName,
          "Registration Date": new Date(reg.registrationDate).toLocaleString(),
          Status: reg.status,
          "Payment Status": reg.paymentStatus,
          Amount: `₹${reg.amount}`,
          "Squad Name": reg.squadName,
          // Squad Leader (Player 1)
          "Leader Name": reg.players?.[0]?.playerName || "",
          "Leader Free Fire ID": reg.players?.[0]?.freeFireId || "",
          "Leader Contact": reg.players?.[0]?.contactNumber || "",
          // Player 2
          "Player 2 Name": reg.players?.[1]?.playerName || "",
          "Player 2 Free Fire ID": reg.players?.[1]?.freeFireId || "",
          "Player 2 Contact": reg.players?.[1]?.contactNumber || "",
          // Player 3
          "Player 3 Name": reg.players?.[2]?.playerName || "",
          "Player 3 Free Fire ID": reg.players?.[2]?.freeFireId || "",
          "Player 3 Contact": reg.players?.[2]?.contactNumber || "",
          // Player 4
          "Player 4 Name": reg.players?.[3]?.playerName || "",
          "Player 4 Free Fire ID": reg.players?.[3]?.freeFireId || "",
          "Player 4 Contact": reg.players?.[3]?.contactNumber || "",
          "Verified By": reg.verifiedBy?.name || "Not Verified",
          "Verification Date": reg.verifiedAt
            ? new Date(reg.verifiedAt).toLocaleString()
            : "Not Verified",
          Notes: reg.notes || "",
        })
      );

      const wsFreeFire = XLSX.utils.json_to_sheet(freeFireData);
      wsFreeFire["!cols"] = Object.keys(freeFireData[0] || {}).map(() => ({
        wch: 20,
      }));
      XLSX.utils.book_append_sheet(wb, wsFreeFire, "FreeFire Battleship");
    }

    // Process other events
    const otherEvents = registrations.filter(
      (reg) =>
        !["STARTUP_SPHERE", "FREEFIRE_BATTLESHIP"].includes(reg.eventType)
    );

    if (otherEvents.length) {
      const otherEventsData = otherEvents.map((reg) => ({
        "Registration ID": reg.id,
        "Event Type": reg.eventType.replace(/_/g, " "),
        "College Name": reg.collegeName,
        "Registration Date": new Date(reg.registrationDate).toLocaleString(),
        Status: reg.status,
        "Payment Status": reg.paymentStatus,
        Amount: `₹${reg.amount}`,
        "Student Name": reg.studentName,
        "Contact Number": reg.contactNumber,
        Email: reg.email,
        "Verified By": reg.verifiedBy?.name || "Not Verified",
        "Verification Date": reg.verifiedAt
          ? new Date(reg.verifiedAt).toLocaleString()
          : "Not Verified",
        Notes: reg.notes || "",
      }));

      const wsOthers = XLSX.utils.json_to_sheet(otherEventsData);
      wsOthers["!cols"] = Object.keys(otherEventsData[0] || {}).map(() => ({
        wch: 20,
      }));
      XLSX.utils.book_append_sheet(wb, wsOthers, "Other Events");
    }

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=registrations.xlsx",
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
