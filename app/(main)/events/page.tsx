"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Coins } from "lucide-react";
import { useState } from "react";
import { EVENTS_BY_DEPARTMENT } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedDepartment, setSelectedDepartment] = useState<
    "CSE (AIML)" | "CSE" | "MECH" | "ECE" | "CIVIL"
  >("CSE (AIML)");
  const router = useRouter();

  const filteredEvents =
    EVENTS_BY_DEPARTMENT[selectedDepartment] ?? [];

  return (
    <div className="p-4 bg-background">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 text-foreground">
        Upcoming Events
      </h1>

      {/* department events filter */}
      <div className="p-2 flex flex-wrap gap-2">
        {["CSE (AIML)", "CSE", "MECH", "ECE", "CIVIL"].map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() =>
              setSelectedDepartment(
                dept as "CSE (AIML)" | "CSE" | "MECH" | "ECE" | "CIVIL"
              )
            }
            className={`border border-border px-3 py-2 rounded-full text-sm md:text-base transition-colors ${
              selectedDepartment === dept
                ? "bg-green-600 text-white"
                : "bg-background hover:bg-accent"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id}>
            <Card className="min-h-full flex flex-col justify-between h-full p-4 shadow-lg border bg-card hover:bg-accent/50 rounded-lg transition-colors">
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
                  className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/70"
                  onClick={() => router.push(`/events/${event.slug}`)}
                >
                  Know More
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
