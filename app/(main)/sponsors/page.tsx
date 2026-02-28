"use client";

import { zenDots } from "@/lib/fonts";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Sponsors } from "@/lib/constants";

const SponsorsPage = () => {
  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4">
      <div className="w-full py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 uppercase ${zenDots.className}`}
          >
            Our Sponsors
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We extend our heartfelt thanks to our sponsors for making Techno
            Bharati 2026 a grand success!
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-6 pb-20"
      >
        {Sponsors.map((sponsor, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 * i }}
            className={`relative w-44 h-32 md:w-56 md:h-40 rounded-2xl border border-border shadow-sm flex items-center justify-center overflow-hidden ${
              sponsor.bg ? "bg-white" : "bg-muted"
            }`}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              fill
              className="object-contain p-5"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SponsorsPage;
