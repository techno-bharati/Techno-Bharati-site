"use client";

import { useEffect, useRef, useState } from "react";
import { eventImages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as EmCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { animate, motion, useInView } from "motion/react";

export default function EventHightlights() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const eventHightlightSectionRef = useRef(null);
  const eventHightlightSectionInView = useInView(eventHightlightSectionRef, {
    once: true,
    margin: "-100px",
  });

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

  const animationVariants = {
    initial: {
      y: 40,
      opacity: 0,
      filter: "blur(5px)",
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  };

  const BGTextAnimationVariants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        bounce: 0,
      },
    },
  };

  const growVariants = {
    initial: {
      width: "0rem",
      opacity: 0.6,
    },
    animate: {
      width: "2.5rem",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const visibleInView = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={eventHightlightSectionRef}
      className="max-w-7xl mx-auto px-4 py-12 relative overflow-clip"
    >
      <div className="space-y-4 mb-8">
        <motion.h2
          variants={animationVariants}
          initial="initial"
          animate={eventHightlightSectionInView ? "animate" : "initial"}
          className="text-3xl font-bold tracking-tighter leading-tight text-left md:text-5xl uppercase"
        >
          event highlights
        </motion.h2>

        <motion.div
          variants={growVariants}
          initial={"initial"}
          animate={eventHightlightSectionInView ? "animate" : "initial"}
          className="h-5 w-10 bg-primary z-10"
        />

        <motion.h1
          variants={BGTextAnimationVariants}
          initial={"initial"}
          animate={eventHightlightSectionInView ? "animate" : "initial"}
          className="z-0 hidden md:block absolute -right-4 top-16 text-[6rem] md:text-[8rem] uppercase font-bold  text-muted pointer-events-none select-none"
        >
          highlights
        </motion.h1>
      </div>

      <motion.div
        variants={visibleInView}
        initial={"initial"}
        animate={eventHightlightSectionInView ? "animate" : "initial"}
        className="w-full space-y-4 mt-16"
      >
        <EmCarousel
          setApi={setApi}
          className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden mt-5"
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
      </motion.div>
    </section>
  );
}
