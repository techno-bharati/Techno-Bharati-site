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
    | "ECE"
    | "CIVIL"
    | "General Engineering";

  const deptFromUrl = searchParams.get("dept");
  const initialDepartment: DepartmentFilter =
    deptFromUrl === "CSE (AIML)" ||
    deptFromUrl === "CSE" ||
    deptFromUrl === "MECH" ||
    deptFromUrl === "ECE" ||
    deptFromUrl === "CIVIL" ||
    deptFromUrl === "General Engineering"
      ? deptFromUrl
      : "CSE (AIML)";

  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFilter>(initialDepartment);

  const filteredEvents = EVENTS_BY_DEPARTMENT[selectedDepartment] ?? [];

  const isGeneralEngineering = selectedDepartment === "General Engineering";

  const technicalEvents = isGeneralEngineering
    ? filteredEvents.filter((event) => event.type === "Technical Event")
    : filteredEvents;

  const nonTechnicalEvents = isGeneralEngineering
    ? filteredEvents.filter((event) => event.type === "Non-Technical Event")
    : [];

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
    <div className="bg-background max-w-7xl min-h-screen mx-auto px-4 py-10 mb-20">
      <motion.h1
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className={`text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-left text-foreground uppercase ${zenDots.className}`}
      >
        Events
      </motion.h1>

      <motion.h1
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="z-0 hidden md:block fixed -right-0 top-32 md:top-36 text-[6rem] md:text-[10rem] uppercase font-bold  text-muted pointer-events-none select-none"
      >
        events
      </motion.h1>

      {/* department events filter */}
      <div className="p-2 flex flex-wrap gap-2">
        {[
          "CSE (AIML)",
          "CSE",
          "MECH",
          "ECE",
          "CIVIL",
          "General Engineering",
        ].map((dept, index) => (
          <motion.button
            key={dept}
            variants={departmentSelectionAnimationVariants}
            initial={"initial"}
            animate={"animate"}
            custom={index}
            type="button"
            onClick={() =>
              setSelectedDepartment(
                dept as
                  | "CSE (AIML)"
                  | "CSE"
                  | "MECH"
                  | "ECE"
                  | "CIVIL"
                  | "General Engineering"
              )
            }
            className={`border border-border px-3 py-2 rounded-full text-sm md:text-base transition-colors ${
              selectedDepartment === dept
                ? "bg-green-600 text-white"
                : "bg-background hover:bg-accent"
            }`}
          >
            {dept}
          </motion.button>
        ))}
      </div>

      {isGeneralEngineering ? (
        <div className="space-y-6 z-10">
          {technicalEvents.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Technical Events
              </h2>
              <div
                key={selectedDepartment}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {technicalEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    selectedDepartment={selectedDepartment}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}

          {nonTechnicalEvents.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Non-Technical Events
              </h2>
              <div
                key={selectedDepartment}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {nonTechnicalEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    selectedDepartment={selectedDepartment}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div
          key={selectedDepartment}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
      )}
    </div>
  );
}
