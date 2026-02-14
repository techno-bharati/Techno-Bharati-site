import { Hero2 } from "@/components/landing/Hero2";
import EventHightlights from "@/components/landing/EventHightlights";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents";
import { Sponsors } from "@/components/landing/Sponsors";
import ReadyToJoin from "@/components/landing/ReadyToJoin";

export default function Home() {
  return (
    <>
      <Hero2 />
      <EventHightlights />
      <FeaturedEvents />
      <Sponsors />
      <ReadyToJoin />
    </>
  );
}
