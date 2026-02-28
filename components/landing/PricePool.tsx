"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const PricePool = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-110px",
  });

  const count = useMotionValue(0);
  const spring = useSpring(count, {
    stiffness: 80,
    damping: 20,
  });

  const rounded = useTransform(spring, (latest) =>
    Math.floor(latest).toLocaleString("en-IN")
  );

  useEffect(() => {
    if (isInView) {
      count.set(100000);
    }
  }, [isInView, count]);

  const animationVariants = {
    initial: { y: 40, opacity: 0, filter: "blur(5px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8 },
    },
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-4 lg:mx-auto rounded-2xl my-28 p-5 md:p-8 shadow-md border border-border flex flex-col items-center gap-5 capitalize"
    >
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="space-y-4 w-full"
      >
        <motion.div
          variants={animationVariants}
          className="w-full flex flex-col items-center"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            Total Prize Pool
          </p>

          <motion.p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
            ₹ <motion.span>{rounded}</motion.span>+
          </motion.p>
        </motion.div>

        <motion.p
          variants={animationVariants}
          className="text-center text-sm md:text-base text-muted-foreground"
        >
          Compete across 20+ events and showcase your talents to win big!
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-5"
        >
          {[
            "📜 Certificates for all participants",
            "🍕 Snacks & Refreshments included",
            "🏆 Trophies for top performers",
          ].map((text) => (
            <motion.p
              key={text}
              variants={animationVariants}
              className="border px-3 py-2 md:px-4 md:py-3 bg-muted rounded-full text-xs md:text-sm text-center"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricePool;
