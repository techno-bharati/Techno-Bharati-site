"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  motionValue,
  MotionValue,
} from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TRANSITION = {
  type: "spring" as const,
  stiffness: 280,
  damping: 20,
  mass: 0.4,
};

function Digit({ value, place }: { value: number; place: number }) {
  const rounded = Math.floor(value / place) % 10;
  const mv = motionValue(rounded);
  const spring = useSpring(mv, TRANSITION);

  useEffect(() => {
    spring.set(rounded);
  }, [rounded, spring]);

  return (
    <div className="relative inline-block w-[1ch] overflow-hidden leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <DigitNumber key={i} mv={spring} number={i} />
      ))}
    </div>
  );
}

function DigitNumber({
  mv,
  number,
}: {
  mv: MotionValue<number>;
  number: number;
}) {
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;

    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let position = offset * bounds.height;

    if (offset > 5) {
      position -= 10 * bounds.height;
    }

    return position;
  });

  if (!bounds.height) {
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

function SlidingNumber({ value }: { value: number }) {
  const padded = value.toString().padStart(2, "0");
  const digits = padded.split("").map(Number);

  const places = digits.map((_, i) => Math.pow(10, digits.length - i - 1));

  return (
    <div className="flex">
      {places.map((place, index) => (
        <Digit key={place} value={value} place={place} />
      ))}
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2026-03-13T00:00:00");

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setHasEnded(true);
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
    <>
      {!hasEnded ? (
        <div className="flex justify-center gap-6">
          {timeBlocks.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className={cn(
                  "text-2xl md:text-5xl font-bold",
                  label !== "Seconds" && "text-primary"
                )}
              >
                <SlidingNumber value={value} />
              </div>

              <span
                className={cn(
                  "text-[0.7rem] uppercase tracking-wider mt-2 text-muted-foreground",
                  label === "Seconds" && "text-primary/80"
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-3xl"
        >
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent font-bold tracking-tight">
            Event is Live!
          </span>
        </motion.h2>
      )}
    </>
  );
}
