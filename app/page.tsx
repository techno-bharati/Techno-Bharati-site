import { EventCards } from "@/components/landing/EventCards";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero2 } from "@/components/landing/Hero2";
import { Sponsors } from "@/components/landing/Sponsors";

export default function Home() {
  return (
    <>
      <Hero2 />
      <EventCards />
      <Sponsors />
      <Features />
      <Footer />
    </>
  );
}
