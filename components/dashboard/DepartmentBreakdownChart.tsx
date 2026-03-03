"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DEPT_COLORS: Record<string, string> = {
  AIML: "#6366f1",
  CSE: "#22c55e",
  MECHANICAL: "#f59e0b",
  CIVIL: "#ef4444",
  ENTC: "#3b82f6",
  GENERAL_ENGINEERING: "#a855f7",
  OTHER: "#71717a",
};

const DEPT_LABELS: Record<string, string> = {
  AIML: "AIML",
  CSE: "CSE",
  MECHANICAL: "Mechanical",
  CIVIL: "Civil",
  ENTC: "ENTC",
  GENERAL_ENGINEERING: "General Engineering",
  OTHER: "Other",
};

const EVENT_COLORS: Record<string, string> = {
  STARTUP_SPHERE: "#6366f1",
  FACE_TO_FACE: "#22c55e",
  PYTHON_FRONTIERS: "#0ea5e9",
  BGMI: "#f59e0b",
  AI_TALES: "#a855f7",

  ENTC_PROJECT_EXPO: "#3b82f6",
  ENTC_DIGITAL_DANGAL: "#14b8a6",
  ENTC_SNAP_AND_SHINE: "#ef4444",

  GE_TECHNO_SCIENCE_QUIZ: "#8b5cf6",
  GE_POSTER_COMPETITION: "#f97316",
  GE_SCITECH_MODEL_EXPO: "#10b981",
  GE_GAMES_BUNDLE: "#06b6d4",
  FREEFIRE: "#eab308",

  CE_MODEL_MAKING: "#f43f5e",
  CE_BATTLE_OF_BRAINS: "#22c55e",
  CE_CAD_MASTER: "#0ea5e9",
  CE_VIDEOGRAPHY: "#a855f7",

  CSE_CODEFUSION: "#3b82f6",
  CSE_PROJECT_EXPO: "#10b981",
  CSE_TREASURE_HUNT: "#f59e0b",

  MECH_PROJECT_EXPO: "#f97316",
  MECH_JUNK_YARD: "#ef4444",
  MECH_IPL_AUCTION: "#06b6d4",
};

const EVENT_LABELS: Record<string, string> = {
  STARTUP_SPHERE: "Startup Sphere",
  FACE_TO_FACE: "Face To Face",
  PYTHON_FRONTIERS: "Python Frontiers",
  BGMI: "BGMI",
  AI_TALES: "AI Tales",

  ENTC_PROJECT_EXPO: "Project Expo",
  ENTC_DIGITAL_DANGAL: "Digital Dangal",
  ENTC_SNAP_AND_SHINE: "Snap & Shine",

  GE_TECHNO_SCIENCE_QUIZ: "Techno Science Quiz",
  GE_POSTER_COMPETITION: "Poster Competition",
  GE_SCITECH_MODEL_EXPO: "SciTech Model Expo",
  GE_GAMES_BUNDLE: "Games Bundle",
  FREEFIRE: "FreeFire",

  CE_MODEL_MAKING: "Model Making",
  CE_BATTLE_OF_BRAINS: "Battle Of Brains",
  CE_CAD_MASTER: "CAD Master",
  CE_VIDEOGRAPHY: "Videography",

  CSE_CODEFUSION: "CODEFUSION",
  CSE_PROJECT_EXPO: "Project Expo",
  CSE_TREASURE_HUNT: "Treasure Hunt",

  MECH_PROJECT_EXPO: "Project Expo",
  MECH_JUNK_YARD: "Junk Yard",
  MECH_IPL_AUCTION: "IPL Auction",
};

function getKeyLabel(key: string) {
  return (
    DEPT_LABELS[key] ??
    EVENT_LABELS[key] ??
    key
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

function getKeyColor(key: string) {
  return DEPT_COLORS[key] ?? EVENT_COLORS[key] ?? "#71717a";
}

interface DepartmentBreakdownProps {
  // expects: { AIML: 12, CSE: 8, MECHANICAL: 5, ... }
  departmentBreakdown: Record<string, number>;
  selectedDepartment?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: { dept: string; count: number; percentage: string };
  }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const { dept, count, percentage } = payload[0].payload;
  return (
    <div className="bg-popover border border-border rounded-xl px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-foreground">{getKeyLabel(dept)}</p>
      <p className="text-muted-foreground">{count} registrations</p>
      <p className="text-muted-foreground">{percentage}% of total</p>
    </div>
  );
}

function CustomLegend({
  data,
}: {
  data: { dept: string; count: number; percentage: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 justify-center">
      {data.map((item) => (
        <div
          key={item.dept}
          className="flex items-center justify-between gap-4 text-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="shrink-0 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: getKeyColor(item.dept) }}
            />
            <span className="text-muted-foreground truncate">
              {getKeyLabel(item.dept)}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-foreground tabular-nums">
              {item.count}
            </span>
            <span className="text-xs text-muted-foreground w-10 text-right tabular-nums">
              {item.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DepartmentBreakdownChart({
  departmentBreakdown,
  selectedDepartment,
}: DepartmentBreakdownProps) {
  const filteredBreakdown = departmentBreakdown ?? {};

  const total = Object.values(filteredBreakdown).reduce((a, b) => a + b, 0);

  const data = Object.entries(filteredBreakdown)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([dept, count]) => ({
      dept,
      count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(1) : "0",
    }));

  const selectedDeptLabel = selectedDepartment
    ? (DEPT_LABELS[selectedDepartment] ?? selectedDepartment.replace(/_/g, " "))
    : null;

  if (data.length === 0) {
    return (
      <Card className="rounded-2xl border bg-card">
        <CardHeader className="px-5 pt-5 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Department Breakdown
            {selectedDeptLabel ? ` (${selectedDeptLabel})` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No registrations yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border bg-card">
      <CardHeader className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Department Breakdown
            {selectedDeptLabel ? ` (${selectedDeptLabel})` : ""}
          </CardTitle>
          <span className="text-xs text-muted-foreground">{total} total</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Pie */}
          <div className="w-full sm:w-48 h-48 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="dept"
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.dept} fill={getKeyColor(entry.dept)} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {/* Center label */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground"
                >
                  <tspan x="50%" dy="-6" fontSize={22} fontWeight={700}>
                    {total}
                  </tspan>
                  <tspan x="50%" dy="18" fontSize={11} fill="#71717a">
                    total
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 w-full">
            <CustomLegend data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
