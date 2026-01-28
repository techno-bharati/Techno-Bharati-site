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
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";

interface VerifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration: any;
}

export function VerifyDialog({
  open,
  onOpenChange,
  registration,
}: VerifyDialogProps) {
  const queryClient = useQueryClient();
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [adminRole, setAdminRole] = useState<
    "SUPER_ADMIN" | "EVENT_ADMIN" | null
  >(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("");

  // Fetch admin role when component mounts
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

  // Update selectedPaymentMode when registration changes
  useEffect(() => {
    if (registration) {
      setSelectedPaymentMode(registration.paymentMode);
    }
  }, [registration]);

  const { mutate: verifyRegistration, isPending } = useMutation({
    mutationFn: async () => {
      if (!registration) return;

      try {
        // First verify the registration
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

        // Then send confirmation email
        const emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registration: verifiedRegistration }),
        });

        if (!emailRes.ok) {
          // Log the error but don't throw since verification was successful
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

  const isSoloEvent = ["FACE_TO_FACE", "PYTHON_WARRIORS", "AI_TALES"].includes(
    registration.eventType
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-grow">
            <div className="grid grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>Event: {registration.eventType.replace(/_/g, " ")}</p>
                    <p>College: {registration.collegeName}</p>
                    <p>Amount: ₹{registration.amount}</p>
                    <p>
                      Date:{" "}
                      {new Date(registration.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center">
                      <p className="mr-2">Payment Mode:</p>
                      <Select
                        value={selectedPaymentMode}
                        onValueChange={setSelectedPaymentMode}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select Payment Mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ONLINE">ONLINE</SelectItem>
                          <SelectItem value="OFFLINE">OFFLINE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p>Department: {registration.department}</p>
                    <p>Class: {registration.class}</p>
                  </div>
                </div>

                {isSoloEvent ? (
                  <div>
                    <h3 className="font-semibold mb-2">Participant Details</h3>
                    <div className="space-y-2 text-sm">
                      <p>Name: {registration.studentName}</p>
                      <p>Email: {registration.email}</p>
                      <p>Contact: {registration.contactNumber}</p>
                    </div>
                  </div>
                ) : registration.eventType === "STARTUP_SPHERE" ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Team Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>Team Name: {registration.teamName}</p>
                        <p>Category: {registration.startupCategory}</p>
                        <p>Members: {registration.numberOfTeamMembers}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Team Leader</h3>
                      <div className="space-y-2 text-sm">
                        <p>Name: {registration.teamLeader?.studentName}</p>
                        <p>Email: {registration.teamLeader?.email}</p>
                        <p>Contact: {registration.teamLeader?.contactNumber}</p>
                      </div>
                    </div>
                    {registration.teamMembers?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Team Members</h3>
                        {registration.teamMembers.map(
                          (member: any, index: number) => (
                            <div key={member.id} className="text-sm mb-2">
                              <p>
                                Member {index + 1}: {member.studentName}
                              </p>
                              <p className="ml-4">Email: {member.email}</p>
                              <p className="ml-4">
                                Contact: {member.contactNumber}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Squad Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>Squad Name: {registration.squadName}</p>
                      </div>
                    </div>
                    {registration.players?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Players</h3>
                        {registration.players.map(
                          (player: any, index: number) => (
                            <div key={player.id} className="text-sm mb-2">
                              <p>
                                {index === 0
                                  ? "Squad Leader"
                                  : `Player ${index + 1}`}
                                : {player.playerName}
                              </p>
                              <p className="ml-4">
                                FreeFire ID: {player.freeFireId}
                              </p>
                              <p className="ml-4">
                                Contact: {player.contactNumber}
                              </p>
                              {index === 0 && player.email && (
                                <p className="ml-4">Email: {player.email}</p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Payment Screenshot</h3>
                <div
                  className="relative aspect-video w-full h-full bg-muted rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setShowImageDialog(true)}
                >
                  <Image
                    src={registration.paymentScreenshot}
                    alt="Payment Screenshot"
                    fill
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex-shrink-0">
            <Separator />
            <DialogFooter className="p-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              {adminRole === "SUPER_ADMIN" && (
                <Button
                  onClick={() => verifyRegistration()}
                  disabled={isPending || registration.status === "CONFIRMED"}
                >
                  {isPending ? "Verifying..." : "Verify Registration"}
                </Button>
              )}
              <Button
                onClick={() => updatePaymentMode()}
                disabled={isUpdating || registration.status === "CONFIRMED"}
              >
                {isUpdating ? "Updating..." : "Update Details"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-[90vw] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Payment Screenshot</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[80vh]">
            <Image
              src={registration.paymentScreenshot}
              alt="Payment Screenshot"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
