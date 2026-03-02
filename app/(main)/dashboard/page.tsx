"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerifyDialog } from "@/components/dashboard/VerifyDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LogOut,
  Trash2,
  Download,
  Lock,
  TrendingUp,
  LayoutGrid,
  IndianRupee,
  Users,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { ChangePasswordDialog } from "@/components/dashboard/ChangePasswordDialog";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLoading, {
  StatsCardSkeleton,
  RegistrationsTableSkeleton,
} from "./loading";
import { Registration } from "@/prisma/generated/prisma/client";
import { EventSelectDropdown } from "@/components/dashboard/EventSelectDropdown";
import { DepartmentBreakdownChart } from "@/components/dashboard/DepartmentBreakdownChart";

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [adminRole, setAdminRole] = useState<
    "SUPER_ADMIN" | "DEPARTMENT_ADMIN" | "EVENT_ADMIN" | null
  >(null);
  const [adminEventType, setAdminEventType] = useState<string | null>(null);
  const [adminDepartment, setAdminDepartment] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<{
    id: string;
    name: string;
    event: string;
  } | null>(null);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>("all");
  const [paymentModeFilter, setPaymentModeFilter] = useState<string>("all");
  const [statusSort, setStatusSort] = useState<
    "PENDING_FIRST" | "CONFIRMED_FIRST"
  >("PENDING_FIRST");

  const { data: adminData, isLoading: isLoadingAdmin } = useQuery({
    queryKey: ["adminDetails"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) throw new Error("Failed to fetch admin details");
      const data = await res.json();
      setAdminRole(data.role);
      setAdminEventType(data.eventType);
      setAdminDepartment(data.department || null);
      setAdminName(data.name || "");
      if (data.role === "EVENT_ADMIN" && data.eventType) {
        setEventFilter(data.eventType);
      }
      return data;
    },
  });

  const {
    data: registrationsData,
    isLoading: isLoadingRegistrations,
    error: registrationsError,
    refetch,
  } = useQuery({
    queryKey: ["registrations", selectedEvent, departmentFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedEvent && selectedEvent !== "all") {
        params.append("eventType", selectedEvent);
      }

      if (selectedEvent === "all") {
        params.append("fetchAll", "true");
      }

      if (departmentFilter && departmentFilter !== "all") {
        params.append("department", departmentFilter);
      }

      const queryString = params.toString();
      const url = `/api/registrations${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to fetch registrations");
      }
      return res.json();
    },
  });

  const getEventOptionsForDepartment = (dept: string | null) => {
    const map: Record<string, { value: string; label: string }[]> = {
      all: [
        { value: "FACE_TO_FACE", label: "Face To Face" },
        { value: "PYTHON_FRONTIERS", label: "Python Frontiers" },
        { value: "BGMI", label: "BGMI" },
        { value: "ENTC_PROJECT_EXPO", label: "ENTC Project Expo" },
        { value: "ENTC_DIGITAL_DANGAL", label: "Digital Dangal" },
        { value: "ENTC_SNAP_AND_SHINE", label: "Snap & Shine" },
        { value: "GE_TECHNO_SCIENCE_QUIZ", label: "Techno Science Quiz" },
        { value: "GE_POSTER_COMPETITION", label: "Poster Competition" },
        {
          value: "GE_SCITECH_MODEL_EXPO",
          label: "SciTech Model Expo 2K26",
        },
        { value: "GE_GAMES_BUNDLE", label: "GE Games Bundle" },
        { value: "FREEFIRE", label: "FreeFire" },
        { value: "CE_MODEL_MAKING", label: "Model Making" },
        { value: "CE_BATTLE_OF_BRAINS", label: "Battle Of Brains" },
        { value: "CE_CAD_MASTER", label: "CAD Master" },
        { value: "CE_VIDEOGRAPHY", label: "Videography" },
        { value: "CSE_CODEFUSION", label: "CODEFUSION" },
        { value: "CSE_PROJECT_EXPO", label: "Project Expo" },
        { value: "CSE_TREASURE_HUNT", label: "Treasure Hunt" },
        { value: "MECH_PROJECT_EXPO", label: "Mech Project Expo" },
        { value: "MECH_JUNK_YARD", label: "Mech Junk Yard" },
        { value: "MECH_IPL_AUCTION", label: "Mech IPL Auction" },
      ],
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
      GENERAL_ENGINEERING: [
        { value: "GE_TECHNO_SCIENCE_QUIZ", label: "Techno Science Quiz" },
        { value: "GE_POSTER_COMPETITION", label: "Poster Competition" },
        {
          value: "GE_SCITECH_MODEL_EXPO",
          label: "SciTech Model Expo 2K26",
        },
        { value: "FREEFIRE", label: "FreeFire" },
      ],
      CIVIL: [
        { value: "CE_MODEL_MAKING", label: "Model Making" },
        { value: "CE_BATTLE_OF_BRAINS", label: "Battle Of Brains" },
        { value: "CE_CAD_MASTER", label: "CAD Master" },
        { value: "CE_VIDEOGRAPHY", label: "Videography" },
      ],
      ENTC: [
        { value: "ENTC_PROJECT_EXPO", label: "Project Expo" },
        { value: "ENTC_DIGITAL_DANGAL", label: "Digital Dangal" },
        { value: "ENTC_SNAP_AND_SHINE", label: "Snap & Shine" },
      ],
      MECHANICAL: [
        { value: "MECH_PROJECT_EXPO", label: "Project Expo" },
        { value: "MECH_JUNK_YARD", label: "Junk Yard" },
        { value: "MECH_IPL_AUCTION", label: "IPL Auction" },
      ],
    };

    if (!dept || dept === "all") return map.all;
    return map[dept] || map.all;
  };

  const safeStats = registrationsData?.stats ?? {
    totalRegistrations: 0,
    totalRevenue: 0,
    totalRevenueForEvent: 0,
    offlineRevenue: 0,
    activeEvents: 0,
    todayRegistrations: 0,
    eventBreakdown: {} as Record<string, number>,
    totalParticipants: 0,
    departmentBreakdown: {} as Record<string, number>,
  };

  const safeRegistrations = registrationsData?.registrations ?? [];

  const eventAdminRegistrations =
    adminRole === "EVENT_ADMIN" && adminEventType
      ? safeRegistrations.filter((reg: any) => reg.eventType === adminEventType)
      : [];

  const eventAdminConfirmed = eventAdminRegistrations.filter(
    (reg: any) => reg.status === "CONFIRMED"
  ).length;

  const eventAdminPending = eventAdminRegistrations.filter(
    (reg: any) => reg.status === "PENDING"
  ).length;

  const filteredRegistrations = safeRegistrations.filter((reg: any) => {
    const matchesSearch =
      reg.collegeName.toLowerCase().includes(search.toLowerCase()) ||
      reg.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      reg.teamName?.toLowerCase().includes(search.toLowerCase()) ||
      reg.squadName?.toLowerCase().includes(search.toLowerCase());
    const matchesEvent =
      adminRole === "EVENT_ADMIN"
        ? reg.eventType === adminEventType
        : eventFilter === "all" || reg.eventType === eventFilter;

    // Add payment mode filter
    const matchesPaymentMode =
      paymentModeFilter === "all" ||
      (paymentModeFilter === "ONLINE" && reg.paymentMode === "ONLINE") ||
      (paymentModeFilter === "OFFLINE" && reg.paymentMode === "OFFLINE");

    return matchesSearch && matchesEvent && matchesPaymentMode;
  });

  const sortedRegistrations = [...filteredRegistrations].sort((a, b) => {
    if (statusSort === "PENDING_FIRST") {
      if (a.status === "PENDING" && b.status !== "PENDING") return -1;
      if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    } else {
      if (a.status === "CONFIRMED" && b.status !== "CONFIRMED") return -1;
      if (a.status !== "CONFIRMED" && b.status === "CONFIRMED") return 1;
    }
    return 0;
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleDelete = async (registration: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setRegistrationToDelete({
      id: registration.id,
      name:
        registration.studentName ||
        registration.teamName ||
        registration.squadName,
      event: registration.eventType.replace(/_/g, " "),
    });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!registrationToDelete) return;

    try {
      const res = await fetch("/api/registrations/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId: registrationToDelete.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete registration");
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Registration deleted successfully");

        setDeleteDialogOpen(false);

        setRegistrationToDelete(null);

        await refetch();
      } else {
        throw new Error(data.error || "Failed to delete registration");
      }
    } catch (error) {
      toast.error("Failed to delete registration");
      console.error("Delete error:", error);
    }
  };

  const exportMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/registrations/export");
      if (!res.ok) {
        throw new Error("Export failed");
      }
      return res.blob();
    },
    onMutate: () => {
      toast.loading("Exporting data...", { id: "export-toast" });
    },
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations-${new Date().toLocaleDateString()}.xlsx`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Data exported successfully!", { id: "export-toast" });
    },
    onError: (error) => {
      console.error("Export error:", error);
      toast.error("Failed to export data", { id: "export-toast" });
    },
  });

  const handleExport = () => {
    exportMutation.mutate();
  };

  const handleRowClick = (registration: Registration) => {
    setSelectedRegistration(registration);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* header  */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {isLoadingAdmin ? (
            <>
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-10 w-64" />
            </>
          ) : (
            <>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                  Admin Panel
                </p>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome, {adminName}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="gap-2 rounded-xl h-9 text-sm"
                  disabled={exportMutation.isPending}
                >
                  <Download className="h-3.5 w-3.5" />
                  {exportMutation.isPending ? "Exporting..." : "Export Excel"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setChangePasswordDialogOpen(true)}
                  className="gap-2 rounded-xl h-9 text-sm"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Change Password</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="gap-2 rounded-xl h-9 text-sm"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>

        {/* error banner */}
        {registrationsError && (
          <div className="flex items-center justify-between bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-4 py-3 text-sm">
            <span>{registrationsError.message}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="text-destructive hover:text-destructive"
            >
              Retry
            </Button>
          </div>
        )}

        {/* filters row */}
        <div className="flex flex-wrap gap-2">
          {adminRole === "SUPER_ADMIN" && (
            <Select
              value={departmentFilter}
              onValueChange={(value) => {
                setDepartmentFilter(value);
                setEventFilter("all");
                setSelectedEvent("all");
              }}
            >
              <SelectTrigger className="w-[180px] rounded-xl h-9 text-sm">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="AIML">AIML</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="MECHANICAL">Mechanical</SelectItem>
                <SelectItem value="CIVIL">Civil</SelectItem>
                <SelectItem value="ENTC">ENTC</SelectItem>
                <SelectItem value="GENERAL_ENGINEERING">
                  General Engineering
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {(adminRole === "SUPER_ADMIN" ||
            adminRole === "DEPARTMENT_ADMIN") && (
            <EventSelectDropdown
              value={eventFilter}
              onValueChange={(value) => {
                setEventFilter(value);
                setSelectedEvent(value === "all" ? "all" : value);
              }}
              adminRole={adminRole}
              departmentFilter={departmentFilter}
              adminDepartment={adminDepartment}
            />
          )}
          <Select defaultValue="all" onValueChange={setPaymentModeFilter}>
            <SelectTrigger className="w-[160px] rounded-xl h-9 text-sm">
              <SelectValue placeholder="Payment Mode" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="ONLINE">Online</SelectItem>
              <SelectItem value="OFFLINE">Offline</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1 min-w-[200px]">
            <Input
              placeholder="Search name, team, college..."
              className="rounded-xl h-9 text-sm pl-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isLoadingRegistrations ? (
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : adminRole === "EVENT_ADMIN" ? (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <StatCard
              icon={<CalendarCheck className="h-5 w-5" />}
              label={`${adminEventType?.replace(/_/g, " ")} Registrations`}
              value={
                registrationsData?.stats.eventBreakdown?.[
                  adminEventType || ""
                ] || 0
              }
              sub={
                <span className="flex flex-col text-xs text-muted-foreground">
                  <span>
                    Confirmed:{" "}
                    <span className="font-semibold">{eventAdminConfirmed}</span>
                  </span>
                  <span>
                    Pending:{" "}
                    <span className="font-semibold">{eventAdminPending}</span>
                  </span>
                </span>
              }
            />
            <StatCard
              icon={<IndianRupee className="h-5 w-5" />}
              label="Total Revenue"
              value={`₹${registrationsData?.stats.totalRevenueForEvent || 0}`}
              sub="From confirmed entries"
            />
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Users className="h-5 w-5" />}
              label="Total Registrations"
              value={safeStats.totalRegistrations}
              sub={
                <span className="text-lg capitalize">
                  {safeStats.todayRegistrations} today
                </span>
              }
            />
            <StatCard
              icon={<IndianRupee className="h-5 w-5" />}
              label="Verified Revenue"
              value={`₹${safeStats.totalRevenue}`}
              sub={
                <span className="flex flex-col gap-0.5 text-base">
                  <span className="flex justify-between">
                    <span>Online</span>
                    <span className="font-semibold text-foreground">
                      ₹
                      {(safeStats.totalRevenue || 0) -
                        (safeStats.offlineRevenue || 0)}
                    </span>
                  </span>
                  <span className="flex justify-between">
                    <span>Offline</span>
                    <span className="font-semibold text-foreground">
                      ₹{safeStats.offlineRevenue || 0}
                    </span>
                  </span>
                  <span className="text-xs">
                    Total revenue from verified registrations
                  </span>
                </span>
              }
            />
            <StatCard
              icon={<LayoutGrid className="h-5 w-5" />}
              label="Active Events"
              value={safeStats.activeEvents}
              sub="Running now"
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Total Participants"
              value={safeStats.totalParticipants}
              sub="Across all events"
            />
          </div>
        )}

        {/* chart area */}
        {adminRole !== "EVENT_ADMIN" && !isLoadingRegistrations && (
          <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 w-full">
            <Card className="rounded-2xl border bg-card col-span-1">
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Event Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-4">
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {Object.entries(safeStats.eventBreakdown || {}).map(
                    ([event, count]) => (
                      <div
                        key={event}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground truncate max-w-[70%]">
                          {event.replace(/_/g, " ")}
                        </span>
                        <span className="font-semibold tabular-nums">
                          {count as number}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
            <DepartmentBreakdownChart
              departmentBreakdown={safeStats.departmentBreakdown}
            />
          </div>
        )}

        {/* registrations table */}
        {isLoadingRegistrations ? (
          <RegistrationsTableSkeleton />
        ) : (
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="px-5 pt-5 pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Registrations
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  ({filteredRegistrations.length} shown)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b bg-muted/40 hover:bg-muted/40">
                      <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Name / Team
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Event
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        College
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Contact
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Payment
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Txn ID
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Date
                      </TableHead>
                      <TableHead
                        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                        onClick={() =>
                          setStatusSort((prev) =>
                            prev === "PENDING_FIRST"
                              ? "CONFIRMED_FIRST"
                              : "PENDING_FIRST"
                          )
                        }
                      >
                        <span className="flex items-center gap-1">
                          Status
                          {statusSort === "PENDING_FIRST" ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronUp className="h-3 w-3" />
                          )}
                        </span>
                      </TableHead>
                      {(adminRole === "SUPER_ADMIN" ||
                        adminRole === "DEPARTMENT_ADMIN" ||
                        adminRole === "EVENT_ADMIN") && (
                        <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground pr-5">
                          Actions
                        </TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={10}
                          className="text-center text-muted-foreground py-16 text-sm"
                        >
                          No registrations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedRegistrations.map((registration: any) => (
                        <TableRow
                          key={registration.id}
                          className="cursor-pointer hover:bg-muted/40 transition-colors border-b border-border/50"
                          onClick={() => handleRowClick(registration)}
                        >
                          <TableCell className="pl-5 font-medium text-sm">
                            {registration.studentName ||
                              registration.teamName ||
                              registration.squadName}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {registration.eventType.replace(/_/g, " ")}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[140px] truncate">
                            {registration.collegeName}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {registration.contactNumber ||
                              registration.teamLeader?.contactNumber ||
                              registration.players?.[0]?.contactNumber}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                registration.paymentMode === "ONLINE"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                  : registration.paymentMode === "OFFLINE"
                                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {registration.paymentMode || "N/A"}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm font-mono text-muted-foreground">
                            {registration.paymentMode === "ONLINE" &&
                            registration.transactionId
                              ? registration.transactionId
                              : "—"}
                          </TableCell>
                          <TableCell className="text-sm font-semibold">
                            ₹{registration.amount}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(
                              registration.createdAt
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                registration.status === "CONFIRMED"
                                  ? "success"
                                  : registration.status === "PENDING"
                                    ? "warning"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {registration.status}
                            </Badge>
                          </TableCell>
                          {(adminRole === "SUPER_ADMIN" ||
                            adminRole === "DEPARTMENT_ADMIN" ||
                            adminRole === "EVENT_ADMIN") && (
                            <TableCell className="pr-5">
                              <div className="flex items-center gap-1.5">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs rounded-lg px-2.5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(registration);
                                  }}
                                  disabled={registration.status === "CONFIRMED"}
                                >
                                  Verify
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={(e) => handleDelete(registration, e)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* dialogs */}
        <VerifyDialog
          open={!!selectedRegistration}
          onOpenChange={(open) => !open && setSelectedRegistration(null)}
          registration={selectedRegistration}
        />
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
          registrationDetails={registrationToDelete}
        />
        <ChangePasswordDialog
          open={changePasswordDialogOpen}
          onOpenChange={setChangePasswordDialogOpen}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border bg-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <div className={`p-2 rounded-xl bg-muted`}>{icon}</div>
        </div>
        <p className="text-2xl font-bold text-foreground tabular-nums">
          {value}
        </p>
        {sub && <div className="mt-2 text-xs text-muted-foreground">{sub}</div>}
      </CardContent>
    </Card>
  );
}
