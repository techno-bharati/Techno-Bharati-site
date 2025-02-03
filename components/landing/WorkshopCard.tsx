"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Workshop data
const workshops = [
  {
    title: "START-UP SPHERE",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165113-sniNOqqsrmigdXlpTJ3jlr1Tq2jBky.png",
    alt: "AI Workshop",
  },
  {
    title: "Artificial Intelligence",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165113-sniNOqqsrmigdXlpTJ3jlr1Tq2jBky.png",
    alt: "AI Workshop",
  },
  {
    title: "Machine Learning",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165113-sniNOqqsrmigdXlpTJ3jlr1Tq2jBky.png",
    alt: "ML Workshop",
  },
  {
    title: "Web Development",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165113-sniNOqqsrmigdXlpTJ3jlr1Tq2jBky.png",
    alt: "Web Dev Workshop",
  },
  {
    title: "Python",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165113-sniNOqqsrmigdXlpTJ3jlr1Tq2jBky.png",
    alt: "Python Workshop",
  },
];

export function WorkshopCards() {
  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Events
        </h2>

        {/* Auto-scrolling animation */}
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-100%"] }} // Moves left
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }} // Infinite scrolling
        >
          {[...workshops, ...workshops].map(
            (
              workshop,
              index // Duplicate list for seamless scroll
            ) => (
              <Card
                key={index}
                className="bg-muted border-none min-w-[250px] hover:scale-105 transition-transform"
              >
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={workshop.image || "/placeholder.svg"}
                      alt={workshop.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-center font-mono text-primary">
                    {workshop.title}
                  </h3>
                </CardContent>
              </Card>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
