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
import { LogOut, Trash2, Download, Lock } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { ChangePasswordDialog } from "@/components/dashboard/ChangePasswordDialog";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLoading, {
  StatsCardSkeleton,
  RegistrationsTableSkeleton,
} from "./loading";
import { Suspense } from "react";

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
    // Map departments to their event types
    const map: Record<string, { value: string; label: string }[]> = {
      all: [
        { value: "STARTUP_SPHERE", label: "Startup Sphere" },
        { value: "FACE_TO_FACE", label: "Face To Face" },
        { value: "PYTHON_FRONTIERS", label: "Python Frontiers" },
        { value: "BGMI", label: "BGMI" },
        { value: "AI_TALES", label: "AI Tales" },
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
        { value: "CE_MODEL_MAKING", label: "Model Making" },
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
        { value: "STARTUP_SPHERE", label: "Startup Sphere" },
        { value: "FACE_TO_FACE", label: "Face To Face" },
        { value: "PYTHON_FRONTIERS", label: "Python Frontiers" },
        { value: "BGMI", label: "BGMI" },
        { value: "AI_TALES", label: "AI Tales" },
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
        { value: "GE_GAMES_BUNDLE", label: "GE Games Bundle" },
      ],
      CIVIL: [
        { value: "CE_MODEL_MAKING", label: "Model Making" },
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
  };

  const safeRegistrations = registrationsData?.registrations ?? [];

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

  const handleRowClick = (registration: any) => {
    setSelectedRegistration(registration);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-5">
      <div className="flex flex-col gap-6 mb-6 sm:flex-row sm:items-center sm:justify-between">
        {isLoadingAdmin ? (
          <>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-24" />
          </>
        ) : (
          <>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">Welcome back, {adminName}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                onClick={handleExport}
                className="w-full sm:w-auto gap-2 rounded-xl"
                disabled={exportMutation.isPending}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {exportMutation.isPending
                    ? "Exporting..."
                    : "Export to Excel"}
                </span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setChangePasswordDialogOpen(true)}
                className="w-full sm:w-auto gap-2 rounded-xl"
              >
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Change Password</span>
                <span className="sm:hidden">Password</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full sm:w-auto gap-2 rounded-xl"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </>
        )}
      </div>

      {registrationsError && (
        <Card className="rounded-xl border-destructive/30">
          <CardHeader className="py-4">
            <CardTitle className="text-sm text-destructive">
              Couldn&apos;t load registrations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground">
              {registrationsError.message}
            </div>
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-4">
        {adminRole === "SUPER_ADMIN" && (
          <Select
            value={departmentFilter}
            onValueChange={(value) => {
              setDepartmentFilter(value);
              // Reset event filter whenever department changes
              setEventFilter("all");
              setSelectedEvent("all");
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px] rounded-xl">
              <SelectValue placeholder="Filter by department" />
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
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        )}
        {(adminRole === "SUPER_ADMIN" || adminRole === "DEPARTMENT_ADMIN") && (
          <Select
            defaultValue="all"
            value={eventFilter}
            onValueChange={(value) => {
              setEventFilter(value);
              setSelectedEvent(value === "all" ? "all" : value);
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px] rounded-xl">
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Events</SelectItem>
              {getEventOptionsForDepartment(
                adminRole === "SUPER_ADMIN" ? departmentFilter : adminDepartment
              ).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Select
          defaultValue="all"
          onValueChange={(value) => {
            setPaymentModeFilter(value);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
            <SelectValue placeholder="Filter by payment mode" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Payment Modes</SelectItem>
            <SelectItem value="ONLINE">Online Payments</SelectItem>
            <SelectItem value="OFFLINE">Offline Payments</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search registrations..."
          className="w-full sm:max-w-sm rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingRegistrations ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            {adminRole === "EVENT_ADMIN" ? (
              <div className="grid gap-4 col-span-full lg:grid-cols-2">
                <Card className="lg:col-span-1 rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {adminEventType?.replace(/_/g, " ")} Registrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {registrationsData?.stats.eventBreakdown?.[
                        adminEventType || ""
                      ] || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total registrations for your event
                    </p>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-1 rounded-xl">
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{registrationsData?.stats.totalRevenueForEvent}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total revenue from confirmed registrations for this event
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <Card className="rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 rounded-xl">
                    <CardTitle className="text-sm font-medium">
                      Total Registrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {safeStats.totalRegistrations}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {Object.entries(safeStats.eventBreakdown || {}).map(
                        ([event, count]) => (
                          <div key={event}>
                            {event.replace(/_/g, " ")}: {count as number}
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Verified Revenue
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      (From verified entries only)
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black dark:text-white">
                      ₹{safeStats.totalRevenue}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between mt-2">
                        <div className="text-sm text-muted-foreground">
                          Online Payments
                        </div>
                        <div className="text-xl font-semibold text-black dark:text-white">
                          ₹
                          {(safeStats.totalRevenue || 0) -
                            (safeStats.offlineRevenue || 0)}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          Offline Payments
                        </div>
                        <div className="text-xl font-semibold text-black dark:text-white">
                          ₹{safeStats.offlineRevenue || 0}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total revenue from verified registrations
                    </p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {safeStats.activeEvents}
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Registration Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b pb-3">
                      <div className="text-sm font-medium text-muted-foreground">
                        Today's Registrations
                      </div>
                      <div className="text-2xl font-bold">
                        {safeStats.todayRegistrations}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Total Participants
                      </div>
                      <div className="text-2xl font-bold">
                        {safeStats.totalParticipants}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Across all events
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>

      {isLoadingRegistrations ? (
        <RegistrationsTableSkeleton />
      ) : (
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name/Team</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  {(adminRole === "SUPER_ADMIN" ||
                    adminRole === "DEPARTMENT_ADMIN" ||
                    adminRole === "EVENT_ADMIN") && (
                    <TableHead className="w-[140px]">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations?.map((registration: any) => (
                  <TableRow
                    key={registration.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(registration)}
                  >
                    <TableCell>
                      {registration.studentName ||
                        registration.teamName ||
                        registration.squadName}
                    </TableCell>
                    <TableCell>
                      {registration.eventType.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell>{registration.collegeName}</TableCell>
                    <TableCell>
                      {registration.contactNumber ||
                        (registration.teamLeader &&
                          registration.teamLeader.contactNumber) ||
                        (registration.players &&
                          registration.players[0]?.contactNumber)}
                    </TableCell>
                    <TableCell>{registration.paymentMode || "N/A"}</TableCell>
                    <TableCell>₹{registration.amount}</TableCell>
                    <TableCell>
                      {new Date(registration.createdAt).toLocaleDateString()}
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
                      >
                        {registration.status}
                      </Badge>
                    </TableCell>
                    {(adminRole === "SUPER_ADMIN" ||
                      adminRole === "DEPARTMENT_ADMIN" ||
                      adminRole === "EVENT_ADMIN") && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(registration);
                            }}
                            disabled={registration.status === "CONFIRMED"}
                          >
                            Verify
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => handleDelete(registration, e)}
                            className="px-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

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
  );
}
