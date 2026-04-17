import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services — Solution Sqauad",
  description:
    "Mobile app development, web development, and backend engineering services by Solution Sqauad.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  );
}
