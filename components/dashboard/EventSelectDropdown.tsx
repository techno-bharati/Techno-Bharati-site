"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

const departmentEventMap: Record<string, { value: string; label: string }[]> = {
  AIML: [
    { value: "FACE_TO_FACE", label: "Face To Face" },
    { value: "PYTHON_FRONTIERS", label: "Python Frontiers" },
    { value: "BGMI", label: "BGMI" },
  ],
  CSE: [
    { value: "CSE_CODEFUSION", label: "CODEFUSION" },
    { value: "CSE_PROJECT_EXPO", label: "Project Expo" },
    { value: "CSE_TREASURE_HUNT", label: "Treasure Hunt" },
  ],
  ENTC: [
    { value: "ENTC_PROJECT_EXPO", label: "Project Expo" },
    { value: "ENTC_DIGITAL_DANGAL", label: "Digital Dangal" },
    { value: "ENTC_SNAP_AND_SHINE", label: "Snap & Shine" },
  ],
  CIVIL: [
    { value: "CE_MODEL_MAKING", label: "Model Making" },
    { value: "CE_BATTLE_OF_BRAINS", label: "Battle Of Brains" },
    { value: "CE_CAD_MASTER", label: "CAD Master" },
    { value: "CE_VIDEOGRAPHY", label: "Videography" },
  ],
  MECHANICAL: [
    { value: "MECH_PROJECT_EXPO", label: "Project Expo" },
    { value: "MECH_JUNK_YARD", label: "Junk Yard" },
    { value: "MECH_IPL_AUCTION", label: "IPL Auction" },
  ],
  GENERAL_ENGINEERING: [
    { value: "GE_TECHNO_SCIENCE_QUIZ", label: "Techno Science Quiz" },
    { value: "GE_POSTER_COMPETITION", label: "Poster Competition" },
    { value: "GE_SCITECH_MODEL_EXPO", label: "SciTech Model Expo 2K26" },
    { value: "FREEFIRE", label: "FreeFire" },
  ],
};

const departmentLabels: Record<string, string> = {
  AIML: "AIML",
  CSE: "CSE",
  ENTC: "ENTC",
  CIVIL: "Civil",
  MECHANICAL: "Mechanical",
  GENERAL_ENGINEERING: "General Engineering",
};

// Flat lookup: event value → label
const allEventsFlat = Object.values(departmentEventMap).flat();
const eventLabelMap = Object.fromEntries(
  allEventsFlat.map((e) => [e.value, e.label])
);

export function EventSelectDropdown({
  value,
  onValueChange,
  adminRole,
  departmentFilter,
  adminDepartment,
}: {
  value: string;
  onValueChange: (v: string) => void;
  adminRole: "SUPER_ADMIN" | "DEPARTMENT_ADMIN" | "EVENT_ADMIN" | null;
  departmentFilter: string;
  adminDepartment: string | null;
}) {
  const isAllDepts =
    adminRole === "SUPER_ADMIN" &&
    (!departmentFilter || departmentFilter === "all");

  const singleDept =
    adminRole === "SUPER_ADMIN" ? departmentFilter : adminDepartment;

  const displayLabel =
    value === "all" ? "All Events" : (eventLabelMap[value] ?? value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] rounded-xl h-9 text-sm justify-between font-normal"
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px] rounded-xl max-h-80 overflow-y-auto">
        {/* All Events option */}
        <DropdownMenuItem
          onSelect={() => onValueChange("all")}
          className="gap-2"
        >
          {value === "all" && <Check className="h-3.5 w-3.5 shrink-0" />}
          <span className={value === "all" ? "font-medium" : "pl-5"}>
            All Events
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isAllDepts ? (
          // Grouped by department for SUPER_ADMIN with "All Departments"
          Object.entries(departmentEventMap).map(([dept, events], idx, arr) => (
            <React.Fragment key={dept}>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {departmentLabels[dept]}
                </DropdownMenuLabel>
                {events.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onSelect={() => onValueChange(opt.value)}
                    className="gap-2"
                  >
                    {value === opt.value ? (
                      <Check className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <span className="w-3.5 shrink-0" />
                    )}
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              {idx < arr.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          ))
        ) : (
          // Flat list for a specific department
          <DropdownMenuGroup>
            {(departmentEventMap[singleDept ?? ""] ?? []).map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onSelect={() => onValueChange(opt.value)}
                className="gap-2"
              >
                {value === opt.value ? (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <span className="w-3.5 shrink-0" />
                )}
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
