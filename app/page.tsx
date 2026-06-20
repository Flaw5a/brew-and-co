import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PopularSection from "@/components/PopularSection";
import EventsSection from "@/components/EventsSection";

export const metadata: Metadata = {
  title: "Brewing Coal — Glasgow Coffee Shop",
  description:
    "Craft coffee, fresh pastries, and light lunches in Glasgow. Open mic nights every Friday. Coffee tastings every Saturday morning.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularSection />
      <div className="pour-line" aria-hidden="true" />
      <EventsSection />
    </>
  );
}
