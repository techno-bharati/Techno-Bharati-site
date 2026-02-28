"use client";

import { pixelifySans, zenDots } from "@/lib/fonts";
import { ArrowRight } from "lucide-react";
import { useInView } from "motion/react";
import Link from "next/link";
import React, { useRef } from "react";
import { motion } from "motion/react";

const ReadyToJoin = () => {
  const readyToJoin = useRef(null);
  const isReadyToJoinInView = useInView(readyToJoin, {
    once: true,
  });

  const animationVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      ref={readyToJoin}
      variants={animationVariants}
      initial={"initial"}
      animate={isReadyToJoinInView ? "animate" : "initial"}
      className="max-w-7xl px-4 mx-auto my-16"
    >
      <div className="w-full p-4 min-h-[13rem] bg-primary/70 rounded-xl flex flex-col gap-6 items-center justify-center">
        <h3
          className={`uppercase font-bold text-2xl font-pixel text-white ${zenDots.className}`}
        >
          Ready to Join?
        </h3>
        <div className="w-full text-md text-center text-white/70">
          <p className="">
            Join our annual student technical fest and showcase your skills.{" "}
            <br className="hidden md:block" />
            Build confidence, gain experience, and explore new ideas with
            passionate minds like yours.
          </p>
        </div>
        <Link
          href={"/events"}
          className="w-full md:w-1/3 font-pixerlify bg-white text-primary rounded-xl px-4 py-2 text-center shadow-sm hover:shadow-md transition-shadow group inline-flex items-center justify-center gap-1"
        >
          Explore Events{" "}
          <ArrowRight className="group-hover:-rotate-45 transition-transform size-4" />
        </Link>
      </div>
    </motion.section>
  );
};

export default ReadyToJoin;
