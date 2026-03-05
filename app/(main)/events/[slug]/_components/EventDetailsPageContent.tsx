"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Coins,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, type Event } from "@/lib/constants";
import { EventContent } from "@/lib/getEventContent";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  slug: string;
  content: EventContent | null;
}

export default function EventDetailsPageContent({ slug, content }: Props) {
  const router = useRouter();
  const event: Event | undefined = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
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
    if (department === "MECH" || department === "Mechanical Engineering")
      return "MECH";
    if (
      department === "ENTC" ||
      department === "Electronic and Telecommunication Engineering"
    )
      return "ENTC";
    return null;
  };

  const deptParam = departmentToDeptParam(event.department);
  const backHref = deptParam
    ? `/events?dept=${encodeURIComponent(deptParam)}`
    : "/events";

  return (
    <div className="p-6 bg-background min-h-screen mb-16">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="outline"
          className="mb-8 group rounded-xl"
          onClick={() => router.push(backHref)}
        >
          <ArrowLeft className="-mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Button>

        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          {event.icon && (
            <div className="relative w-full md:w-72 lg:w-80 shrink-0 aspect-video rounded-2xl overflow-hidden bg-muted shadow-md">
              <Image
                src={event.icon}
                alt={event.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col justify-between gap-4 flex-1">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-3">
                {event.department}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {event.name}
              </h1>
            </div>

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

        {content?.description && (
          <section className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              About the Event
            </h2>
            <p className="text-base sm:text-xl leading-relaxed text-muted-foreground">
              {content.description}
            </p>
          </section>
        )}

        {content?.body && (
          <section className="mb-12">
            <MarkdownContent content={content.body} />
          </section>
        )}

        {!content && (
          <p className="text-muted-foreground text-sm">
            Event details coming soon.
          </p>
        )}

        <div className="sticky bottom-6 md:static mt-8">
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
}
