"use client";

import { zenDots } from "@/lib/fonts";
import React from "react";
import { motion } from "motion/react";

const SponsorsPage = () => {
  return (
    <section className="min-h-screen max-w-7xl mx-auto">
      <div className="w-full">
        <motion.h1
          initial={{
            opacity: 0,
            filter: "blur(7px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          className={`text-2xl uppercase md:text-3xl lg:text-6xl ${zenDots.className} text-center mt-11`}
        >
          Sponsors
        </motion.h1>
      </div>
    </section>
  );
};

export default SponsorsPage;
