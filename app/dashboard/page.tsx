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

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [adminRole, setAdminRole] = useState<
    "SUPER_ADMIN" | "EVENT_ADMIN" | null
  >(null);
  const [adminEventType, setAdminEventType] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<{
    id: string;
    name: string;
    event: string;
  } | null>(null);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);

  useQuery({
    queryKey: ["adminDetails"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) throw new Error("Failed to fetch admin details");
      const data = await res.json();
      setAdminRole(data.role);
      setAdminEventType(data.eventType);
      setAdminName(data.name || "");
      if (data.role === "EVENT_ADMIN" && data.eventType) {
        setEventFilter(data.eventType);
      }
      return data;
    },
  });

  const { data, error, refetch } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await fetch("/api/registrations");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to fetch registrations");
      }
      return res.json();
    },
  });

  const filteredRegistrations = data?.registrations?.filter((reg: any) => {
    const matchesSearch =
      reg.collegeName.toLowerCase().includes(search.toLowerCase()) ||
      reg.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      reg.teamName?.toLowerCase().includes(search.toLowerCase()) ||
      reg.squadName?.toLowerCase().includes(search.toLowerCase());
    const matchesEvent =
      adminRole === "EVENT_ADMIN"
        ? reg.eventType === adminEventType
        : eventFilter === "all" || reg.eventType === eventFilter;
    return matchesSearch && matchesEvent;
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

  if (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Error loading registrations: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {adminName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
            disabled={exportMutation.isPending}
          >
            <Download className="h-4 w-4" />
            {exportMutation.isPending ? "Exporting..." : "Export to Excel"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setChangePasswordDialogOpen(true)}
            className="gap-2"
          >
            <Lock className="h-4 w-4" />
            Change Password
          </Button>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {adminRole === "SUPER_ADMIN" && (
          <Select
            defaultValue="all"
            onValueChange={(value) => setEventFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="STARTUP_SPHERE">Startup Sphere</SelectItem>
              <SelectItem value="FACE_TO_FACE">Face To Face</SelectItem>
              <SelectItem value="PYTHON_WARRIORS">Python Warriors</SelectItem>
              <SelectItem value="FREEFIRE_BATTLESHIP">
                FreeFire Battleship
              </SelectItem>
              <SelectItem value="AI_TALES">AI Tales</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Input
          placeholder="Search registrations..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminRole === "EVENT_ADMIN" ? (
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {adminEventType?.replace(/_/g, " ")} Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.stats.eventBreakdown?.[adminEventType || ""] || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total registrations for your event
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Registrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.stats.totalRegistrations}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Object.entries(data?.stats.eventBreakdown || {}).map(
                    ([event, count]) => (
                      <div key={event}>
                        {event.replace(/_/g, " ")}: {count as number}
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Verified Revenue
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  (From verified entries only)
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{data?.stats.totalRevenue}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total revenue from verified registrations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.stats.activeEvents}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today&apos;s Registrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.stats.todayRegistrations}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name/Team</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[140px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations?.map((registration: any) => (
                <TableRow
                  key={registration.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedRegistration(registration)}
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRegistration(registration);
                        }}
                        disabled={registration.status === "CONFIRMED"}
                      >
                        Verify
                      </Button>
                      {adminRole === "SUPER_ADMIN" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => handleDelete(registration, e)}
                          className="px-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
