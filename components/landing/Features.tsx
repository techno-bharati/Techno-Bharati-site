import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarSearch,
  Swords,
  SquareKanban,
  PhoneOutgoing,
} from "lucide-react";

const features = [
  {
    title: "Events",
    icon: (
      <CalendarSearch className="w-6 h-6 lg:w-10 lg:h-10 text-primary group-hover:text-primary/80 transition-colors" />
    ),
    description: "Exciting tech events and competitions",
  },
  {
    title: "Competitions",
    icon: (
      <Swords className="w-6 h-6 lg:w-10 lg:h-10 text-primary group-hover:text-primary/80 transition-colors" />
    ),
    description: "Showcase your skills and win prizes",
  },
  {
    title: "Workshops",
    icon: (
      <SquareKanban className="w-6 h-6 lg:w-10 lg:h-10 text-primary group-hover:text-primary/80 transition-colors" />
    ),
    description: "Learn from industry experts",
  },
  {
    title: "Contact Us",
    icon: (
      <PhoneOutgoing className="w-6 h-6 lg:w-10 lg:h-10 text-primary group-hover:text-primary/80 transition-colors" />
    ),
    description: "Get in touch with our team",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            What We Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for an incredible technology festival featuring workshops,
            competitions, and exciting events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-1 border-none hover:bg-muted/90 transition-colors"
            >
              <CardContent className="p-6">
                <div className="relative flex items-center lg:items-start justify-start mb-4 p-2 rounded-xl">
                  {feature.icon}
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
