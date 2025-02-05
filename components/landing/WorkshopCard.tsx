"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const events = [
  {
    title: "START-UP SPHERE",
    image: "/f2f.jpeg",
    alt: "AI Workshop",
  },
  {
    title: "Python Warrior",
    image: "/python-wor.png",
    alt: "python warrior",
  },
  {
    title: "AI Tales",
    image: "/ai-tales.png",
    alt: "ai tales",
  },
  {
    title: "Face To Face",
    image: "/f2f.jpeg",
    alt: "face to face",
  },
];

export function WorkshopCards() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Events
        </h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12 min-w-max"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
          >
            {[...events, ...events, ...events].map((event, index) => (
              <div
                key={index}
                className="bg-neutral-900 border border-white/10 rounded-3xl p-6 w-[300px] flex-shrink-0"
              >
                <div className="relative w-full h-56 overflow-hidden rounded-lg">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    layout="fill"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl text-center mt-6">{event.title}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
