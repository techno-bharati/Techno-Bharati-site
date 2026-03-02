"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Users,
  Gamepad2,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  CreditCard,
  Calendar,
  CheckCircle2,
  Receipt,
  IdCard,
  Trophy,
  IndianRupee,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Registration,
  TeamMember,
  Player,
} from "@/prisma/generated/prisma/client";
import { removeItem } from "motion/react";

interface VerifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration: Registration & {
    players?: Player[]; // For squad events
    teamMembers?: TeamMember[]; // For team events
  };
}

export function VerifyDialog({
  open,
  onOpenChange,
  registration,
}: VerifyDialogProps) {
  const queryClient = useQueryClient();
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [adminRole, setAdminRole] = useState<
    "SUPER_ADMIN" | "DEPARTMENT_ADMIN" | "EVENT_ADMIN" | null
  >(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("");

  useEffect(() => {
    const fetchAdminRole = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdminRole(data.role);
        }
      } catch (error) {
        console.error("Failed to fetch admin role:", error);
      }
    };
    fetchAdminRole();
  }, []);

  useEffect(() => {
    if (registration) {
      setSelectedPaymentMode(registration.paymentMode);
    }
  }, [registration]);

  const { mutate: verifyRegistration, isPending } = useMutation({
    mutationFn: async () => {
      if (!registration) return;

      try {
        const verifyRes = await fetch(`/api/registrations/verify`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registrationId: registration.id }),
        });

        console.log("Verify Response:", verifyRes);

        if (!verifyRes.ok) {
          throw new Error("Failed to verify registration");
        }

        const verifiedRegistration = await verifyRes.json();

        const emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registration: verifiedRegistration }),
        });

        if (!emailRes.ok) {
          console.error("Failed to send confirmation email");
          toast.error(
            "Registration verified but failed to send confirmation email"
          );
          return verifiedRegistration;
        }

        return verifiedRegistration;
      } catch (error) {
        console.error("Verification error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Registration verified and confirmation email sent");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Verification error:", error);
      toast.error("Failed to verify registration. Please try again.");
    },
  });

  const { mutate: updatePaymentMode, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/registrations/updatePaymentMode", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationId: registration.id,
          paymentMode: selectedPaymentMode,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update payment mode");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Payment mode updated successfully");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error updating payment mode:", error);
      toast.error("Failed to update payment mode");
    },
  });

  if (!registration || !open) return null;

  const hasSquad =
    Boolean(registration.squadName) ||
    (Array.isArray(registration.players) && registration.players.length > 0);

  const teamMembers = Array.isArray(registration.teamMembers)
    ? registration.teamMembers
    : [];

  const hasTeam = Boolean(registration.teamName) || teamMembers.length > 0;

  const isIndividual = !hasSquad && !hasTeam;

  // For team events, treat the main registration as the team leader.
  // Leader name comes from registration.studentName and contact from primary contact details.
  const primaryLeader = registration.studentName
    ? {
        id: "primary-leader",
        studentName: registration.studentName,
        email: registration.email,
        contactNumber: registration.contactNumber,
      }
    : null;

  const allTeamMembers = primaryLeader
    ? [primaryLeader, ...teamMembers]
    : teamMembers;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "REJECTED":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl xl:max-w-6xl h-[95vh] bg-background/95 backdrop-blur-sm flex flex-col overflow-hidden border shadow-2xl rounded-xl">
          <DialogHeader className="flex-shrink-0 border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    Registration Details
                  </DialogTitle>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`px-4 py-1.5 text-sm font-semibold mx-4 ${getStatusColor(registration.status)}`}
              >
                {registration.status}
              </Badge>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-grow px-1">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">
              <div className="xl:col-span-2 space-y-6">
                <Card className="rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Event Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <Trophy className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Event Name
                          </p>
                          <p className="font-semibold text-lg">
                            {registration.eventType.replace(/_/g, " ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            College
                          </p>
                          <p className="font-semibold capitalize">
                            {registration.collegeName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Department
                          </p>
                          <p className="font-semibold">
                            {registration.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <IdCard className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Class
                          </p>
                          <p className="font-semibold capitalize">
                            {registration.class}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* payment info card */}
                <Card className="rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Amount
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{registration.amount}
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Date
                        </p>
                        <p className="font-semibold">
                          {new Date(registration.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                          Payment Mode
                        </p>
                        <Select
                          value={selectedPaymentMode}
                          onValueChange={setSelectedPaymentMode}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ONLINE">ONLINE</SelectItem>
                            <SelectItem value="OFFLINE">OFFLINE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {registration.paymentMode === "ONLINE" &&
                      registration.transactionId && (
                        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                          <IndianRupee className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                              Transaction ID
                            </p>
                            <p className="font-mono font-semibold text-primary">
                              {registration.transactionId}
                            </p>
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
                {/* participants info card */}
                {isIndividual && (
                  <Card className="rounded-xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Participant Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Full Name
                          </p>
                          <p className="font-semibold">
                            {registration.studentName}
                          </p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                          </p>
                          <p className="font-semibold text-sm break-all">
                            {registration.email}
                          </p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Contact
                          </p>
                          <p className="font-semibold">
                            {registration.contactNumber}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {/* Squad info - BGMI/FreeFire events */}
                {hasSquad && (
                  <Card className="rounded-xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5 text-primary" />
                        Squad Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {registration.squadName && (
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Squad Name
                          </p>
                          <p className="text-xl font-bold text-primary">
                            {registration.squadName}
                          </p>
                        </div>
                      )}

                      {/* Primary Contact - from registration (squad leader's main contact) */}
                      <div className="p-4 bg-muted/50 rounded-xl border border-muted">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                          Primary Contact (Squad Leader)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" /> Email
                            </p>
                            <p className="font-semibold text-sm break-all">
                              {registration.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" /> Contact
                            </p>
                            <p className="font-semibold">
                              {registration.contactNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      {registration.players &&
                        registration.players.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                              Players ({registration.players.length})
                            </p>
                            <div className="grid gap-3">
                              {registration.players.map(
                                (player: Player, index: number) => (
                                  <div
                                    key={player.id}
                                    className={`p-4 rounded-xl border ${
                                      index === 0
                                        ? "bg-primary/10 border-primary/30"
                                        : "bg-muted/30 border-muted"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-3">
                                      <Badge
                                        variant={
                                          index === 0 ? "default" : "secondary"
                                        }
                                        className="text-xs"
                                      >
                                        {index === 0
                                          ? "Squad Leader"
                                          : `Player ${index + 1}`}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Name
                                        </p>
                                        <p className="font-semibold">
                                          {player.playerName}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          BGMI ID
                                        </p>
                                        <p className="font-mono font-semibold text-primary">
                                          {player.bgmiId}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Phone className="w-3 h-3" /> Contact
                                        </p>
                                        <p className="font-semibold">
                                          {player.contactNumber || "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                )}
                {/* team info card */}
                {hasTeam && (
                  <Card className="rounded-xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Team Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {registration.teamName && (
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Team Name
                            </p>
                            <p className="text-xl font-bold text-primary">
                              {registration.teamName}
                            </p>
                          </div>
                        )}
                        {registration.startupCategory && (
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Category
                            </p>
                            <p className="font-semibold">
                              {registration.startupCategory}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Primary Contact - from registration level */}
                      {(registration.email || registration.contactNumber) && (
                        <div className="p-4 bg-muted/50 rounded-xl border border-muted">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                            Primary Contact
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {registration.email && (
                              <div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Mail className="w-3 h-3" /> Email
                                </p>
                                <p className="font-semibold text-sm break-all">
                                  {registration.email}
                                </p>
                              </div>
                            )}
                            {registration.contactNumber && (
                              <div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> Contact
                                </p>
                                <p className="font-semibold">
                                  {registration.contactNumber}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Team Members - All members including team leader in one list */}
                      {allTeamMembers.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                              Team Members
                            </p>
                            <Badge variant="outline">
                              {allTeamMembers.length} member
                              {allTeamMembers.length !== 1 ? "s" : ""}
                            </Badge>
                          </div>
                          <div className="grid gap-3">
                            {allTeamMembers.map(
                              (member: any, index: number) => {
                                const isLeader = !!primaryLeader && index === 0;
                                return (
                                  <div
                                    key={member.id ?? `member-${index}`}
                                    className={`p-4 rounded-xl border ${
                                      isLeader
                                        ? "bg-primary/10 border-primary/30"
                                        : "bg-muted/30 border-muted"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-3">
                                      {isLeader ? (
                                        <Badge className="bg-primary text-white">
                                          Team Leader
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          Member {index + 1}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Name
                                        </p>
                                        <p className="font-semibold">
                                          {member.studentName || "N/A"}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Mail className="w-3 h-3" /> Email
                                        </p>
                                        <p className="font-semibold text-sm break-all">
                                          {member.email ||
                                            (isLeader && registration.email) ||
                                            "N/A"}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Phone className="w-3 h-3" /> Contact
                                        </p>
                                        <p className="font-semibold">
                                          {member.contactNumber ||
                                            (isLeader &&
                                              registration.contactNumber) ||
                                            "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}{" "}
              </div>

              {/* Right Column - Payment Screenshot */}
              <div className="xl:col-span-1">
                <Card className="shadow-sm sticky top-0 rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      Payment Screenshot
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="rounded-xl">
                    <div
                      className="relative aspect-[3/4] w-full bg-muted rounded-lg overflow-hidden cursor-pointer group border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors"
                      onClick={() => setShowImageDialog(true)}
                    >
                      <Image
                        src={registration.paymentScreenshot}
                        alt="Payment Screenshot"
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold drop-shadow-lg">
                          Click to enlarge
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Click image to view in full size
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>

          <div className="flex-shrink-0 border-t bg-muted/30">
            <DialogFooter className="p-6 gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="min-w-[120px] rounded-xl"
              >
                Close
              </Button>

              {(adminRole === "SUPER_ADMIN" ||
                adminRole === "DEPARTMENT_ADMIN" ||
                adminRole === "EVENT_ADMIN") && (
                <Button
                  onClick={() => verifyRegistration()}
                  disabled={isPending || registration.status === "CONFIRMED"}
                  className="min-w-[160px] gap-2 rounded-xl"
                  variant={
                    registration.status === "CONFIRMED"
                      ? "secondary"
                      : "default"
                  }
                >
                  {isPending ? (
                    "Verifying..."
                  ) : registration.status === "CONFIRMED" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
                    </>
                  ) : (
                    "Verify Registration"
                  )}
                </Button>
              )}

              <Button
                onClick={() => updatePaymentMode()}
                disabled={isUpdating || registration.status === "CONFIRMED"}
                className="min-w-[140px] rounded-xl"
                variant="outline"
              >
                {isUpdating ? "Updating..." : "Update Details"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-[90vh]">
            <Image
              src={registration.paymentScreenshot}
              alt="Payment Screenshot"
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
          <button
            onClick={() => setShowImageDialog(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
