"use client";

import { Hero2 } from "@/components/landing/Hero2";
import EventHightlights from "@/components/landing/EventHightlights";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents";
import { Sponsors } from "@/components/landing/Sponsors";
import ReadyToJoin from "@/components/landing/ReadyToJoin";
import { Navigation2 } from "@/components/landing/Navigation2";
import { Footer } from "@/components/landing/Footer";
import PricePool from "@/components/landing/PricePool";
import Banner from "@/components/landing/Banner";

export default function Home() {
  return (
    <>
      <Navigation2 />
      <Hero2 />
      <Banner />
      <PricePool />
      <FeaturedEvents />
      <Sponsors />
      <EventHightlights />
      <ReadyToJoin />
      <Footer />
    </>
  );
}
