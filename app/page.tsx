"use client";

import { Hero2 } from "@/components/landing/Hero2";
import EventHightlights from "@/components/landing/EventHightlights";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents";
import { Sponsors } from "@/components/landing/Sponsors";
import ReadyToJoin from "@/components/landing/ReadyToJoin";
import { Navigation2 } from "@/components/landing/Navigation2";
import { Footer } from "@/components/landing/Footer";
import Image from "next/image";
import PricePool from "@/components/landing/PricePool";

export default function Home() {
  return (
    <>
      <Navigation2 />
      <Hero2 />
      <div className="max-w-5xl mx-auto my-5 px-4">
        <Image
          src={"/banner.png"}
          alt="banner"
          className="h-full w-full shadow-md rounded-2xl"
          height={800}
          width={800}
        />
      </div>
      <PricePool />
      <FeaturedEvents />
      <Sponsors />
      <EventHightlights />
      <ReadyToJoin />
      <Footer />
    </>
  );
}
