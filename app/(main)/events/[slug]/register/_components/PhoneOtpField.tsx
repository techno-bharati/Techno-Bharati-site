"use client";

import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/hooks/useRegistrationForm";
import RequiredAsterisk from "@/components/RequiredAstrick";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface PhoneOtpFieldProps {
  form: UseFormReturn<FormValues>;
  name: string;
  label: string;
  isPending: boolean;
  placeholder?: string;
}

export function PhoneOtpField({
  form,
  name,
  label,
  isPending,
  placeholder = "Enter contact number",
}: PhoneOtpFieldProps) {
  const [otp, setOtp] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const phone = form.watch(name as any) as string | undefined;
  const primaryContactVerified = form.watch("primaryContactVerified") ?? false;

  useEffect(() => {
    if (!phone) {
      setOtp("");
      setOtpSent(false);
    }

    // If phone number changes after verification, require re-verification
    if (primaryContactVerified) {
      form.setValue("primaryContactVerified", false as any, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const buildE164Phone = () => {
    if (!phone) return null;
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 10) {
      return `+91${digits}`;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
      return `+${digits}`;
    }

    if (phone.startsWith("+")) {
      return phone;
    }

    return null;
  };

  const handleSendOtp = async () => {
    const e164 = buildE164Phone();
    if (!e164) {
      toast.error("Enter a valid 10-digit contact number before sending OTP");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetch("/api/verify-phoneno/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: e164 }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      form.setValue("primaryContactVerified", false as any, {
        shouldDirty: true,
        shouldValidate: true,
      });
      toast.success("OTP sent to your phone");
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const e164 = buildE164Phone();
    if (!e164) {
      toast.error("Enter a valid contact number before verifying");
      return;
    }

    if (!otp || otp.trim().length < 4) {
      toast.error("Enter the OTP you received");
      return;
    }

    try {
      setIsVerifying(true);
      const res = await fetch("/api/verify-phoneno/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: e164, code: otp.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Invalid or expired OTP");
        form.setValue("primaryContactVerified", false as any, {
          shouldDirty: true,
          shouldValidate: true,
        });
        return;
      }

      form.setValue("primaryContactVerified", true as any, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setOtp("");
      toast.success("Phone number verified successfully");
    } catch (error) {
      console.error("Verify OTP error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} <RequiredAsterisk />
          </FormLabel>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder={placeholder}
                  {...field}
                  value={field.value || "+91"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val.startsWith("+91")) {
                      field.onChange("+91");
                    } else {
                      const afterPrefix = val.slice(3).replace(/\D/g, ""); // strip non-digits after +91
                      field.onChange("+91" + afterPrefix);
                    }
                  }}
                  onKeyDown={(e) => {
                    const input = e.currentTarget;
                    const { selectionStart, selectionEnd } = input;
                    const isBackspaceOrDelete =
                      e.key === "Backspace" || e.key === "Delete";
                    if (
                      isBackspaceOrDelete &&
                      selectionStart !== null &&
                      selectionStart <= 3 &&
                      selectionEnd !== null &&
                      selectionEnd <= 3
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onSelect={(e) => {
                    const input = e.currentTarget;
                    if (
                      input.selectionStart !== null &&
                      input.selectionStart < 3
                    ) {
                      input.setSelectionRange(3, input.selectionEnd ?? 3);
                    }
                  }}
                  disabled={isPending || isVerifying}
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                onClick={handleSendOtp}
                disabled={
                  isPending ||
                  isSending ||
                  !phone ||
                  phone.replace(/\D/g, "").length < 10 ||
                  primaryContactVerified
                }
                className="rounded-xl"
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : otpSent ? (
                  "Resend OTP"
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={
                    isPending ||
                    isVerifying ||
                    !otpSent ||
                    primaryContactVerified
                  }
                  className="md:max-w-xs"
                />
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={
                    isPending || isVerifying || !otpSent || !otp.trim().length
                  }
                  className="rounded-xl"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
              {primaryContactVerified && (
                <span className="inline-flex items-center text-xs text-green-600">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Verified
                </span>
              )}
            </div>

            {!primaryContactVerified && (
              <p className="text-xs text-muted-foreground">
                You must verify this contact number using OTP before submitting
                the form.
              </p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
