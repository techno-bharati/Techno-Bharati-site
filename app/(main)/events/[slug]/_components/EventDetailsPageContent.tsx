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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <li key={index} className="mt-1">
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
          className="rounded-lg"
          onClick={() => router.push("/events")}
        >
          Back to Events
        </Button>
      </div>
    );
  }

  const departmentToDeptParam = (department: string) => {
    // `EVENTS_BY_DEPARTMENT` keys are: "CSE (AIML)", "CSE", "MECH", "ECE", "CIVIL", "General Engineering"
    if (department === "Civil") return "CIVIL";
    if (department === "General Engineering") return "General Engineering";
    if (department === "CSE (AIML)") return "CSE (AIML)";
    if (department === "CSE") return "CSE";
    if (department === "MECH") return "MECH";
    if (department === "ENTC") return "ENTC";
    // Fallback: don't force a department filter
    return null;
  };

  const deptParam = departmentToDeptParam(event.department);
  const backToEventsHref = deptParam
    ? `/events?dept=${encodeURIComponent(deptParam)}`
    : "/events";

  const { modalData } = event;

  return (
    <div className="p-4 md:p-8 bg-background min-h-screen mb-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Button
          variant="outline"
          className="rounded-lg group"
          onClick={() => router.push(backToEventsHref)}
        >
          <ArrowLeft className="-mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Button>

        <Card className="shadow-md border bg-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {event.name}
            </CardTitle>
            <div className="mt-2 flex flex-wrap gap-3 text-muted-foreground text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                <span>Entry: ₹ {event.entryFee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-sm md:text-base">
              {modalData.description}
            </p>

            <div>
              <h3 className="text-lg md:text-xl text-foreground mb-2">Rules</h3>
              {renderRules(modalData.rules, modalData.eventName)}
            </div>

            <div>
              <h3 className="text-lg md:text-xl text-foreground mb-2">
                Registration Steps
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground text-sm md:text-base">
                {modalData.registration.map((step, index) => (
                  <li key={index} className="mt-1">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full flex flex-col justify-between md:flex-row md:gap-8 lg:gap-16 mt-4">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg md:text-xl text-foreground">Queries</h3>
                <div className="text-muted-foreground text-sm md:text-base mt-2 space-y-1">
                  {Object.entries(modalData.queries).map(([key, value]) => (
                    <p key={key} className="flex items-center gap-2">
                      <PhoneCall className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{key}</span>
                      <span className="text-muted-foreground/60">
                        ({value})
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Button
                variant="default"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl group"
                onClick={() => router.push(`/events/${slug}/register`)}
              >
                Register
                <ArrowRight className="-ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetailsPageContent;
