import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About — Solution Sqauad",
  description: "Learn about Solution Sqauad — our story, mission, values, and team.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
    </div>
  );
}
