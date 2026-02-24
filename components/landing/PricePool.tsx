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
    margin: "-99px",
  });

  // Animate from 0 → 100000
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

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-4 lg:mx-auto rounded-2xl my-28 p-8 shadow-md border border-border flex flex-col items-center gap-5 capitalize"
    >
      <div className="space-y-4">
        <div className="w-full flex flex-col items-center">
          <p>Total Prize Pool</p>

          <motion.p className="text-5xl font-extrabold text-primary">
            ₹ <motion.span>{rounded}</motion.span>+
          </motion.p>
        </div>

        <p className="text-center">
          Compete across 20+ events and showcase your talents to win big!
        </p>

        <div className="sm:flex gap-5 space-y-2 sm:space-y-0 *:border *:px-4 *:py-3 *:bg-muted *:rounded-full *:w-full *:sm:w-fit">
          <p>📜 Certificates for all participants</p>
          <p>🍕 Snacks & Refreshments included</p>
          <p>🏆 Trophies for top performers</p>
        </div>
      </div>
    </section>
  );
};

export default PricePool;
