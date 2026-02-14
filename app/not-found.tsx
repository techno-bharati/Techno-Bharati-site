"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { zenDots } from "@/lib/fonts";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <h1
        className={`text-[6rem] md:text-[10rem] font-extrabold tracking-tighter text-primary ${zenDots.className}`}
      >
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-4xl font-bold uppercase tracking-wide">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-muted-foreground">
        Looks like this page drifted into another dimension. Let’s bring you
        back to INFUSION AI.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-105"
        >
          <Home size={18} />
          Back Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

      <p className="absolute bottom-6 text-xs uppercase tracking-widest text-muted-foreground">
        INFUSION AI
      </p>
    </div>
  );
}
