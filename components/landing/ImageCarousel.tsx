"use client";

import { useEffect, useState } from "react";
import { eventImages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as EmCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function ImageCarousel() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Create a duplicated array for seamless looping
  const duplicatedImages = [...eventImages, ...eventImages];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(eventImages.length); // Use original length for dots
    setCurrent(api.selectedScrollSnap() % eventImages.length); // Modulo for correct dot highlighting

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() % eventImages.length);
    });
  }, [api]);

  const plugin = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Event Highlights
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground">
          Glimpses of our exciting events and memorable moments
        </p>
      </div>

      <div className="w-full space-y-4">
        <EmCarousel
          setApi={setApi}
          className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden"
          plugins={[plugin]}
        >
          <CarouselContent className="rounded-xl">
            {duplicatedImages.map((image, index) => (
              <CarouselItem key={`${image}-${index}`} className="basis-full">
                <div className="aspect-[16/9] max-w-4xl mx-auto">
                  <img
                    src={image}
                    alt={`Event ${(index % eventImages.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < eventImages.length ? "eager" : "lazy"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </EmCarousel>

        <div className="py-2 text-center space-x-1">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === current
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
