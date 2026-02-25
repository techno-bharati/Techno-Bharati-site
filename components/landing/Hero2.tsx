"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Countdown from "./Countdown";
import { motion, useAnimate, stagger } from "motion/react";
import { useEffect } from "react";
import { TextShimmer } from "../ui/text-shimmer";
import { ArrowRight } from "lucide-react";
import { zenDots } from "@/lib/fonts";

export function Hero2() {
  const handleExplore = () => {
    window.location.href = "/events";
  };

  const [scope, animate] = useAnimate();

  const startAnimating = () => {
    animate(
      "#hero",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        delay: stagger(0.1, { startDelay: 0.2 }),
        duration: 0.2,
        ease: "easeInOut",
      }
    );
  };

  useEffect(() => {
    startAnimating();
  }, []);

  const animation = {
    initial: { y: 8, opacity: 0, filter: "blur(10px)" },
  };

  return (
    <section
      ref={scope}
      className="relative min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center overflow-hidden z-10"
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 text-center  space-x-4 w-full h-fit"
      >
        <Image
          src="/bvcoek.png"
          alt="BVCOE Logo"
          width={160}
          height={160}
          className="h-20 sm:h-full w-auto"
        />
        <div className="text-muted-foreground">
          <p className="font-bold text-sm md:text-xl lg:text-2xl uppercase">
            Bharati Vidyapeeth&apos;s College of Engineering, Kolhapur
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={"/naac.png"}
            alt="naaclogo"
            width={100}
            height={100}
            className="h-16 sm:h-full w-auto"
          />
          <Image
            src={"/Iste.png"}
            alt="istelogo"
            width={100}
            height={100}
            className="size-14 sm:size-20 rounded-full"
          />
        </div>
      </motion.div>
      <motion.div
        id="hero"
        initial={"initial"}
        variants={animation}
        className="relative z-20 text-center space-y-10 px-4 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div
          id="hero"
          initial={"initial"}
          variants={animation}
          className=""
        >
          <div
            className={`text-[4rem] md:text-[6rem] lg:text-[9rem] font-bold tracking-tight flex flex-col space-y-[-2.5rem] md:space-y-[-4rem] lg:space-y-[-6rem] ${zenDots.className}`}
          >
            <motion.h1
              id="hero"
              initial={"initial"}
              variants={animation}
              className="inline-block uppercase bg-gradient-to-b from-primary/100 via-primary/85 to-primary/60 bg-clip-text text-transparent tracking-wide"
            >
              Techno
            </motion.h1>

            <motion.h1
              id="hero"
              initial={"initial"}
              variants={animation}
              className="inline-block bg-gradient-to-r uppercase from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent tracking-tighter"
            >
              Bharati
            </motion.h1>
          </div>

          <motion.p
            id="hero"
            initial={"initial"}
            variants={animation}
            className="text-[1rem] md:text-[1.5rem] text-muted-foreground font-light"
          >
            <TextShimmer spread={4} className="text-xl md:text-3xl">
              25th March, 2026
            </TextShimmer>
          </motion.p>
        </motion.div>

        <motion.div id="hero" initial={"initial"} variants={animation}>
          <Countdown />
        </motion.div>

        <motion.div id="hero" initial={"initial"} variants={animation}>
          <Button
            size="lg"
            onClick={handleExplore}
            className="rounded-xl shadow-sm hover:shadow-lg transition-shadow shadow-primary hover:shadow-primary/50 border border-primary/10 text-white px-6 py-4 md:text-lg lg:text-xl bg-gradient-to-b from-primary to-primary/40 hover:bg-gradient-to-b group"
          >
            Explore Events{" "}
            <ArrowRight className="group-hover:-rotate-45 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
