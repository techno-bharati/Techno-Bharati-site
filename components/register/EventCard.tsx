"use client";

import { Event } from "@/lib/constants";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Coins, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";

const EventCard = ({
  event,
  selectedDepartment,
  index,
}: {
  event: Event;
  selectedDepartment?: string;
  index: number;
}) => {
  const router = useRouter();

  const cardAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 },
    }),
  };

  return (
    <motion.div
      key={event.id}
      variants={cardAnimation}
      initial="initial"
      animate="animate"
      custom={index}
      className="z-30 h-full"
    >
      <Card className="group relative h-full flex flex-col overflow-hidden rounded-2xl border-0 bg-card shadow-md  transition-all duration-300">
        {event.icon ? (
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <Image
              src={event.icon}
              alt={event.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wide bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
              {event.type}
            </span>
          </div>
        ) : (
          <div className="relative h-20 w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-end px-4 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wide bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
              {event.type}
            </span>
          </div>
        )}

        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-snug line-clamp-2">
              {event.name}
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            {event.department}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 justify-between gap-4 pt-0">
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 text-sm">
              <Coins className="h-3.5 w-3.5 text-primary" />
              {event.entryFee === "0" || event.entryFee === "" ? (
                <span className="text-green-600 dark:text-green-400">Free</span>
              ) : (
                <span>&#8377;&nbsp;{event.entryFee}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary/70" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full rounded-xl font-semibold group/btn bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
            onClick={() => {
              const deptParam = selectedDepartment
                ? `?dept=${encodeURIComponent(selectedDepartment)}`
                : "";
              router.push(`/events/${event.slug}${deptParam}`);
            }}
          >
            Know More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
