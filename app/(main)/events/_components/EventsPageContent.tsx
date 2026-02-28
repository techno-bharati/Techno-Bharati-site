"use client";

import { useState } from "react";
import { EVENTS_BY_DEPARTMENT } from "@/lib/constants";
import EventCard from "@/components/register/EventCard";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { zenDots } from "@/lib/fonts";

export default function EventsPageContent() {
  const searchParams = useSearchParams();
  type DepartmentFilter =
    | "CSE (AIML)"
    | "CSE"
    | "MECH"
    | "ENTC"
    | "CIVIL"
    | "General Engineering";

  const departmentEventNames = {
    "CSE (AIML)": "infusion ai",
    CSE: "coderace",
    CIVIL: "nirman",
    ENTC: "techno spark",
    MECH: "creanturous",
    "General Engineering": "techno science expo",
  };
  const deptFromUrl = searchParams.get("dept");

  const initialDepartment: DepartmentFilter =
    deptFromUrl === "CSE (AIML)" ||
    deptFromUrl === "CSE" ||
    deptFromUrl === "MECH" ||
    deptFromUrl === "ENTC" ||
    deptFromUrl === "CIVIL" ||
    deptFromUrl === "General Engineering"
      ? deptFromUrl
      : "CSE (AIML)";

  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFilter>(initialDepartment);

  const filteredEvents = EVENTS_BY_DEPARTMENT[selectedDepartment] ?? [];

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

  return (
    <div className="relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.8 }}
        className=" hidden md:block absolute right-0 top-40 text-[7rem] md:text-[12rem] font-extrabold uppercase text-foreground pointer-events-none select-none z-0 whitespace-nowrap"
      >
        EVENTS
      </motion.h1>

      <div className="relative z-10 max-w-7xl min-h-screen mx-auto px-4 md:px-4 xl:px-0 py-10 md:py-14 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 uppercase ${zenDots.className}`}
          >
            Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated lineup of exciting technical and non-technical
            events.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mt-8">
          {[
            "CSE (AIML)",
            "CSE",
            "MECH",
            "ENTC",
            "CIVIL",
            "General Engineering",
          ].map((dept, index) => (
            <motion.button
              key={dept}
              variants={departmentSelectionAnimationVariants}
              initial="initial"
              animate="animate"
              custom={index}
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
              className={`
            px-4 py-2 md:px-5 md:py-3
            rounded-2xl
            text-sm md:text-base font-medium
            border border-border 
            transition-all duration-200
            ${
              selectedDepartment === dept
                ? "bg-green-600 text-white shadow-md scale-105"
                : "bg-background hover:bg-accent"
            }
          `}
            >
              {dept}
            </motion.button>
          ))}
        </div>

        {selectedDepartment && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`z-10 my-8 text-xl md:text-2xl lg:text-3xl font-semibold uppercase ${zenDots.className}`}
          >
            {departmentEventNames[selectedDepartment]}
          </motion.h2>
        )}

        <div
          key={selectedDepartment}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              selectedDepartment={selectedDepartment}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
