"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-02-28T00:00:00");

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {timeBlocks.map(({ label, value }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-16 sm:w-24 h-16 sm:h-24 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <motion.span
                key={value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {value.toString().padStart(2, "0")}
              </motion.span>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full">
              <div className="h-1 w-12 sm:w-16 mx-auto rounded-full bg-gradient-to-r from-emerald-400/50 to-cyan-400/50" />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-gray-400 mt-4 uppercase tracking-wider">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
