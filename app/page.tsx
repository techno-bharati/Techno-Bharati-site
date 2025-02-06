import { EventCards } from "@/components/landing/EventCards";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Sponsors } from "@/components/landing/Sponsors";

export default function Home() {
  return (
    <>
      <Hero />
      <EventCards/>
      <Sponsors />
      <Features />
      <Footer />
    </>
  );
}
