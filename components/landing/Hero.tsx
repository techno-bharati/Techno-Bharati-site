"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Countdown from "./Countdown";
import { motion } from "framer-motion";
import { ParticleCanvas } from "../ui/ParticleCanvas";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ParticleCanvas Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-center space-y-8 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block"
            >
              <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-transparent">
                Techno{" "}
              </span>
            </motion.span>
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block"
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Bharati
              </span>
            </motion.span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              28th February, 2025
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl">
            <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent animate-pulse font-bold tracking-tighter">
              Events are Live Now!
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-b from-primary to-primary/50 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/events">EXPLORE</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
