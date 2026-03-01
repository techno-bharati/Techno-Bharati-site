"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft, Home, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zenDots } from "@/lib/fonts";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const event = searchParams.get("event");
  const [countdown, setCountdown] = useState(60);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const fromStorage =
      typeof window !== "undefined" &&
      sessionStorage.getItem("registrationSuccess");
    const fromUrl = searchParams.get("from") === "registration";
    const fromRegistration = fromStorage || fromUrl;

    if (!fromRegistration) {
      const timeout = setTimeout(() => {
        router.replace("/events");
      }, 300);
      return () => clearTimeout(timeout);
    }
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("registrationSuccess");
    }
    setAllowed(true);
  }, [router, searchParams]);

  useEffect(() => {
    if (!allowed) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [allowed, router]);

  if (!allowed) return null;

  return (
    <div className="flex items-center justify-center px-4 py-10 min-h-[calc(100vh-theme(spacing.20)-200px)]">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 16,
            stiffness: 200,
            delay: 0.1,
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl scale-150" />
            <div className="relative bg-green-500/10 border border-green-500/30 rounded-full p-6">
              <CheckCircle2
                className="h-16 w-16 text-green-500"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1
            className={`text-3xl md:text-4xl font-bold uppercase mb-3 ${zenDots.className}`}
          >
            You're In!
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Your registration was successful.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="rounded-2xl border bg-card p-6 mb-6 space-y-4"
        >
          {event && (
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                  Event
                </p>
                <p className="text-sm font-semibold text-foreground">{event}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                Confirmation
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email within 24 hours after
                verification.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-center text-xs text-muted-foreground mb-6 px-4"
        >
          Your registration is currently{" "}
          <span className="text-amber-500 font-semibold">
            pending verification
          </span>
          . Our team will review your payment and confirm your spot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-border"
            />
            <circle
              cx="16"
              cy="16"
              r="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
              strokeDasharray={`${2 * Math.PI * 13}`}
              strokeDashoffset={`${2 * Math.PI * 13 * (countdown / 60)}`}
            />
          </svg>
          <p className="text-sm text-muted-foreground">
            Redirecting to home in{" "}
            <span className="font-semibold text-foreground tabular-nums">
              {countdown}s
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            variant="outline"
            className="flex-1 rounded-xl group"
            onClick={() => router.push("/events")}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Button>
          <Button
            className="flex-1 rounded-xl"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4" />
            Go Home Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
