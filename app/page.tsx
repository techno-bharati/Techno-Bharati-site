import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Sponsors } from "@/components/landing/Sponsors";
import { WorkshopCards } from "@/components/landing/WorkshopCard";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkshopCards />
      <Sponsors />
      <Features />
    </>
  );
}
