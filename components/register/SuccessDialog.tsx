"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            Registration Successful
          </DialogTitle>
          <DialogDescription>
            Thank you for registering! You will receive a confirmation email
            within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/")} className="w-full sm:w-auto">
            Return to Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
