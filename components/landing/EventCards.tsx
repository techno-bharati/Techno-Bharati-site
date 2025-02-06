"use client";

import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect } from "react";

const events = [
  {
    title: "Startup Sphere",
    image: "/startup.jpg",
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
  {
    title: "FreeFire Battleship",
    image: "/freefire.png",
    alt: "face to face",
  },
];

export function EventCards() {
  const controls = useAnimationControls();

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        x: "-50%",
        transition: { duration: 20, ease: "linear" },
      });
      controls.set({ x: "0%" });
      startAnimation();
    };

    startAnimation();

    return () => {
      controls.stop();
    };
  }, [controls]);

  return (
    <section className="relative py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />

          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div className="flex gap-8 min-w-max px-4" animate={controls}>
            {[...events, ...events].map((event, index) => (
              <div
                key={index}
                className="bg-neutral-900 border border-white/10 rounded-2xl p-4 w-[280px] flex-shrink-0 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative w-full h-32 overflow-hidden rounded-lg">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    layout="fill"
                    className="object-contain rounded-md"
                  />
                </div>
                <h3 className="text-lg font-medium text-center mt-4 capitalize">
                  {event.title}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
