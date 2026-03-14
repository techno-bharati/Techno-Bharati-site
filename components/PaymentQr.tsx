"use client";

import Image from "next/image";
import { getQRCodePath } from "@/lib/qrCodes";
import type { EventName } from "@/lib/types/registration";

interface PaymentQRProps {
  event: EventName;
  participants: number;
}

export function PaymentQR({ event, participants }: PaymentQRProps) {
  const qrPath = getQRCodePath(event, participants);

  const amount =
    event === "BGMI" ? 300 : event === "FreeFire" ? 500 : participants * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-muted-foreground">
        Scan to pay{" "}
        <span className="font-semibold text-foreground">₹{amount}</span>
      </p>
      <Image
        src={qrPath}
        alt={`Payment QR for ₹${amount}`}
        width={180}
        height={180}
        className="rounded-xl border"
        unoptimized
      />
    </div>
  );
}
