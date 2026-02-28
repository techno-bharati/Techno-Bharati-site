"use client";

import { useInView, motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Sponsors as SponsorsArray } from "@/lib/constants";

const track = [
  ...SponsorsArray,
  ...SponsorsArray,
  ...SponsorsArray,
  ...SponsorsArray,
];

export function Sponsors() {
  const sponsorsSectionRef = useRef(null);
  const sponsorsSectionInView = useInView(sponsorsSectionRef, {
    once: true,
    margin: "-200px",
  });

  const animationVariants = {
    initial: { y: 40, opacity: 0, filter: "blur(5px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8 },
    },
  };

  const BGTextAnimationVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { bounce: 0 } },
  };

  const growVariants = {
    initial: { width: "0rem", opacity: 0.6 },
    animate: { width: "2.5rem", opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section ref={sponsorsSectionRef} className="py-12">
      <div className="max-w-7xl mx-auto px-4 overflow-clip relative">
        <div className="space-y-4 mb-8">
          <motion.h2
            variants={animationVariants}
            initial="initial"
            animate={sponsorsSectionInView ? "animate" : "initial"}
            className="text-3xl font-bold tracking-tighter leading-tight text-left md:text-5xl uppercase"
          >
            Our Sponsors
          </motion.h2>

          <motion.div
            variants={growVariants}
            initial="initial"
            animate={sponsorsSectionInView ? "animate" : "initial"}
            className="h-5 w-10 bg-primary z-10"
          />

          <motion.h1
            variants={BGTextAnimationVariants}
            initial="initial"
            animate={sponsorsSectionInView ? "animate" : "initial"}
            className="z-0 hidden md:block absolute -right-3 top-2 text-[6rem] md:text-[8rem] uppercase font-bold text-muted pointer-events-none select-none"
          >
            sponsors
          </motion.h1>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {track.map((sponsor, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={150}
                  height={120}
                  className={`rounded-lg transition-all duration-300 object-contain ${
                    sponsor.bg ? "bg-white p-1" : ""
                  }`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
