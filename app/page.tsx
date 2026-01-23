import { EventCards } from "@/components/landing/EventCards";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero2 } from "@/components/landing/Hero2";
import { Sponsors } from "@/components/landing/Sponsors";
import ImageCarousel from "@/components/landing/ImageCarousel";
import { Navigation2 } from "@/components/landing/Navigation2";

export default function Home() {
  return (
    <>
    <Navigation2 />
      <Hero2 />
      <ImageCarousel />
      <EventCards />
      <Sponsors />
      <Features />
      <Footer />
    </>
  );
}
