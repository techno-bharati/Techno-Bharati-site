"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  PhoneCall,
  Calendar,
  MapPin,
  Clock,
  Coins,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, type Event } from "@/lib/constants";

const renderRules = (rules: string[], eventName: string) => {
  if (eventName === "Startup Sphere") {
    return (
      <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base space-y-2">
        {rules.map((rule, index) => {
          if (rule.trim() === "") {
            return <div key={index} className="my-2" />;
          }

          if (/^\d+\./.test(rule)) {
            return (
              <div key={index} className="ml-4 flex gap-2">
                <span className="text-muted-foreground">
                  {rule.split(".")[0]}.
                </span>
                <span>{rule.split(".").slice(1).join(".").trim()}</span>
              </div>
            );
          }

          const getIndentationClass = () => {
            if (rule.startsWith("   •")) return "ml-8";
            if (rule.startsWith("     ○")) return "ml-12";
            if (rule.startsWith("   ")) return "ml-8";
            if (rule.startsWith("     ")) return "ml-12";
            if (rule.startsWith("•")) return "ml-4";
            if (rule.startsWith("○")) return "ml-8";
            return "ml-4";
          };

          const cleanRule = rule.replace(/^[\s•○]+/, "").trim();
          const indentClass = getIndentationClass();
          const bulletType = rule.includes("•")
            ? "•"
            : rule.includes("○")
              ? "○"
              : "";

          return (
            <div key={index} className={`${indentClass} flex gap-2`}>
              {bulletType && (
                <span className="text-muted-foreground">{bulletType}</span>
              )}
              <span>{cleanRule}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 text-sm md:text-base">
      {rules.map((rule, index) => (
        <li key={index} className="mt-1 text-base md:text-lg lg:text-xl">
          {rule}
        </li>
      ))}
    </ol>
  );
};

const EventDetailsPageContent = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const event: Event | undefined = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          Event not found
        </h1>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => router.push("/events")}
        >
          Back to Events
        </Button>
      </div>
    );
  }

  const departmentToDeptParam = (department: string) => {
    if (department === "Civil" || department === "CIVIL") return "CIVIL";
    if (department === "General Engineering") return "General Engineering";
    if (department === "CSE (AIML)") return "CSE (AIML)";
    if (department === "CSE") return "CSE";
    if (department === "MECH" || department === "Mechanical Engineering") {
      return "MECH";
    }
    if (
      department === "ENTC" ||
      department === "Electronic and Telecommunication Engineering"
    ) {
      return "ENTC";
    }
    return null;
  };

  const deptParam = departmentToDeptParam(event.department);
  const backToEventsHref = deptParam
    ? `/events?dept=${encodeURIComponent(deptParam)}`
    : "/events";

  const { modalData } = event;

  return (
    <div className="p-6 bg-background min-h-screen mb-16">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="outline"
          className="mb-8  group rounded-xl"
          onClick={() => router.push(backToEventsHref)}
        >
          <ArrowLeft className="-mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Button>

        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          {event.icon && (
            <div className="relative w-full md:w-72 lg:w-80 shrink-0 aspect-video rounded-2xl overflow-hidden bg-muted shadow-md">
              <Image
                src={event.icon}
                alt={event.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col justify-between gap-4 flex-1 h-full">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-3">
                {event.department}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {event.name}
              </h1>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-base sm:text-lg text-muted-foreground">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                <span>Entry: ₹ {event.entryFee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.venue}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="hidden md:flex w-fit px-10 py-6 text-lg font-semibold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg group"
              onClick={() => router.push(`/events/${slug}/register`)}
            >
              Register Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="my-10 h-px bg-border" />

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            About the Event
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
            {modalData.description}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Rules</h2>
          <div className="text-blue-500">
            {renderRules(modalData.rules, modalData.eventName)}
          </div>
        </section>

        {modalData.registration.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Registration Steps
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg md:text-xl text-muted-foreground">
              {modalData.registration.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Queries</h2>

          <div className="space-y-3 text-base sm:text-lg md:text-xl text-muted-foreground">
            {Object.entries(modalData.queries).map(([key, value]) => (
              <p key={key} className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5" />
                <span className="capitalize font-medium text-foreground">
                  {key}
                </span>
                <a
                  href={`tel:${value}`}
                  className="text-muted-foreground/70 hover:underline underline-offset-4 hover:text-primary"
                >
                  {value}
                </a>
              </p>
            ))}
          </div>
        </section>
        <div className="sticky bottom-6 md:static">
          <Button
            size="lg"
            className="w-full md:w-auto px-10 py-6 text-lg md:text-xl font-semibold rounded-2xl bg-primary text-white shadow-lg group"
            onClick={() => router.push(`/events/${slug}/register`)}
          >
            Register Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPageContent;
