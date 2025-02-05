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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerifyDialog } from "@/components/dashboard/VerifyDialog";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await fetch("/api/registrations");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const filteredRegistrations = data?.registrations?.filter((reg: any) => {
    const matchesSearch =
      reg.collegeName.toLowerCase().includes(search.toLowerCase()) ||
      reg.studentName?.toLowerCase().includes(search.toLowerCase());
    const matchesEvent =
      eventFilter === "all" ||
      reg.eventType.toLowerCase() === eventFilter.toLowerCase();
    return matchesSearch && matchesEvent;
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
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
            <SelectItem value="FIREFIRE_BATTLESHIP">
              FireFire Battleship
            </SelectItem>
            <SelectItem value="AI_TALES">AI Tales</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search registrations..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{data?.stats.totalRevenue}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats.activeEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats.todayRegistrations}
            </div>
          </CardContent>
        </Card>
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
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
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
    </div>
  );
}
