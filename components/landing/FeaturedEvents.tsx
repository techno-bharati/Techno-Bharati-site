"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { EVENTS_BY_DEPARTMENT } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturedEvents() {
  const featuredEventSectionRef = useRef(null);

  const featuredEventSectionInView = useInView(featuredEventSectionRef, {
    once: true,
    margin: "-200px",
  });

  const animationVariants = {
    initial: {
      y: 40,
      opacity: 0,
      filter: "blur(5px)",
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  };

  const BGTextAnimationVariants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        bounce: 0,
      },
    },
  };

  const growVariants = {
    initial: {
      width: "0rem",
      opacity: 0.6,
    },
    animate: {
      width: "2.5rem",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const departmentSelectionAnimationVariants = {
    initial: {
      y: 12,
      opacity: 0,
      filter: "blur(10px)",
    },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: custom * 0.05,
      },
    }),
  };

  type DepartmentFilter =
    | "CSE (AIML)"
    | "CSE"
    | "MECH"
    | "ENTC"
    | "CIVIL"
    | "General Engineering";

  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFilter>("CSE (AIML)");

  const filteredEvents = EVENTS_BY_DEPARTMENT[selectedDepartment] ?? [];
  const duplicatedEvents = [...filteredEvents, ...filteredEvents];

  return (
    <section
      ref={featuredEventSectionRef}
      className="relative py-12 px-4 bg-background max-w-7xl flex flex-col items-center justify-center overflow-clip mx-auto"
    >
      <div className="mx-auto overflow-clip w-full">
        <div className="space-y-4 mb-8">
          <motion.h2
            variants={animationVariants}
            initial="initial"
            animate={featuredEventSectionInView ? "animate" : "initial"}
            className="text-3xl font-bold tracking-tighter leading-tight text-left md:text-5xl uppercase"
          >
            Featured Events
          </motion.h2>

          <motion.div
            variants={growVariants}
            initial={"initial"}
            animate={featuredEventSectionInView ? "animate" : "initial"}
            className="h-5 w-10 bg-primary z-10"
          />

          <motion.h1
            variants={BGTextAnimationVariants}
            initial={"initial"}
            animate={featuredEventSectionInView ? "animate" : "initial"}
            className="z-0 hidden md:block absolute -right-3 top-20 md:top-24 text-[6rem] md:text-[8rem] uppercase font-bold  text-muted pointer-events-none select-none"
          >
            featured
          </motion.h1>
        </div>

        <div className="relative min-w-full overflow-hidden">
          <div className="py-3 flex flex-wrap gap-2">
            {[
              "CSE (AIML)",
              "CSE",
              "MECH",
              "ENTC",
              "CIVIL",
              "General Engineering",
            ].map((dept, index) => (
              <motion.button
                variants={departmentSelectionAnimationVariants}
                initial={"initial"}
                animate={featuredEventSectionInView ? "animate" : "initial"}
                custom={index}
                key={dept}
                type="button"
                onClick={() =>
                  setSelectedDepartment(
                    dept as
                      | "CSE (AIML)"
                      | "CSE"
                      | "MECH"
                      | "ENTC"
                      | "CIVIL"
                      | "General Engineering"
                  )
                }
                className={`border border-border px-3 py-2 rounded-xl text-xs md:text-sm transition-colors ${
                  selectedDepartment === dept
                    ? "bg-green-600 text-white"
                    : "bg-background hover:bg-accent"
                }`}
              >
                {dept}
              </motion.button>
            ))}
          </div>
        </div>
        <div
          key={selectedDepartment}
          className="relative w-full overflow-hidden cursor-default"
        >
          <motion.div
            key={selectedDepartment}
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {duplicatedEvents.map((event, index) => (
              <Link
                href={`/events/${event.slug}`}
                key={`${selectedDepartment}-${index}`}
                className="group"
              >
                <motion.div
                  initial={{
                    y: 12,
                    opacity: 0,
                    filter: "blur(7px)",
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                      delay: index * 0.2,
                    },
                  }}
                  key={`${selectedDepartment}-${index}`}
                  className="h-[13rem] w-[26rem] shrink-0 bg-primary/10 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/20 flex flex-col justify-between transition-colors"
                >
                  <p className="text-sm text-muted-foreground">{event.type}</p>

                  <h2 className="text-xl font-semibold">{event.name}</h2>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {event.modalData.description}
                  </p>

                  <p className="text-primary text-xs font-bold group-hover:underline uppercase group flex gap-1 items-center underline-offset-2">
                    View Details
                    <ArrowRight className="group-hover:-rotate-45 transition-transform size-4" />
                  </p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
