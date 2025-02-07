"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Countdown from "./Countdown";
import { ParticleCanvas } from "../ui/ParticleCanvas";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent z-10" />

      <div className="relative z-20 text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter">
            <span className="inline-block">
              <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-transparent">
                Techno{" "}
              </span>
            </span>
            <span className="inline-block">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Bharati
              </span>
            </span>
          </h1>
          <div>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              28th February, 2025
            </p>
          </div>
        </div>

        <div>
          <Countdown />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl">
            <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent font-bold tracking-tighter">
              Events are Live Now!
            </span>
          </h2>
        </div>

        <div>
          <Button
            size="lg"
            className="bg-gradient-to-b from-primary to-primary/50 text-white hover:opacity-90"
            asChild
          >
            <Link href="/events" passHref>
              EXPLORE
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
