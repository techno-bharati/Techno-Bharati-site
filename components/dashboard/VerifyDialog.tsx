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
import { useState } from "react";

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

  const { mutate: verifyRegistration, isPending } = useMutation({
    mutationFn: async () => {
      if (!registration) return;

      // First verify the registration
      const verifyRes = await fetch(
        `/api/registrations/${registration.id}/verify`,
        {
          method: "PATCH",
        }
      );
      if (!verifyRes.ok) throw new Error("Failed to verify");

      // Then send confirmation email
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registration }),
      });

      if (!emailRes.ok) {
        console.error("Failed to send email");
        // We don't throw here because the verification was successful
      }

      return verifyRes.json();
    },
    onSuccess: () => {
      toast.success("Registration verified and confirmation email sent");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Verification failed");
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
              <Button
                onClick={() => verifyRegistration()}
                disabled={isPending || registration.status === "CONFIRMED"}
              >
                {isPending ? "Verifying..." : "Verify Registration"}
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
