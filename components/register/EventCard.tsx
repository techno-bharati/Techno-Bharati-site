"use client";

import { Event } from "@/lib/constants";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Coins, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const EventCard = ({
  event,
  selectedDepartment,
}: {
  event: Event;
  selectedDepartment?: string;
}) => {
  const router = useRouter();
  return (
    <Card
      key={event.id}
      className="min-h-full flex flex-col justify-between h-full shadow-sm border bg-card rounded-xl transition-colors"
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {event.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Coins className="h-5 w-5 text-muted-foreground" />
          <p>Entry: &#8377; {`${event.entryFee}`}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <p>{event.date}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <p>{event.time}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <p>{event.venue}</p>
        </div>
        <Button
          variant="default"
          className="mt-4 w-full bg-primary dark:text-white text-primary-foreground hover:bg-primary/95 rounded-xl font-medium group"
          onClick={() => {
            const deptParam = selectedDepartment
              ? `?dept=${encodeURIComponent(selectedDepartment)}`
              : "";
            router.push(`/events/${event.slug}${deptParam}`);
          }}
        >
          Know More
          <ArrowRight className="-ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
