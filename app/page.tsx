import { EventCards } from "@/components/landing/EventCards";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero2 } from "@/components/landing/Hero2";
import { Sponsors } from "@/components/landing/Sponsors";
import ImageCarousel from "@/components/landing/ImageCarousel";

export default function Home() {
  return (
    <>
      <Hero2 />
      <ImageCarousel />
      <EventCards />
      <Sponsors />
      <Features />
      <Footer />
    </>
  );
}
