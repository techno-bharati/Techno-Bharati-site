import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Events",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165216-2WkQ9t9pazWrjy4cAinYelP3k482pO.png",
    description: "Exciting tech events and competitions",
  },
  {
    title: "Competitions",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165216-2WkQ9t9pazWrjy4cAinYelP3k482pO.png",
    description: "Showcase your skills and win prizes",
  },
  {
    title: "Workshops",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165216-2WkQ9t9pazWrjy4cAinYelP3k482pO.png",
    description: "Learn from industry experts",
  },
  {
    title: "Contact Us",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165216-2WkQ9t9pazWrjy4cAinYelP3k482pO.png",
    description: "Get in touch with our team",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for an incredible technology festival featuring workshops,
            competitions, and exciting events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-muted border-none hover:bg-muted/80 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <div className="relative h-16 w-16 mx-auto mb-4">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
