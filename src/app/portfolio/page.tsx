import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/PortfolioSection";

export const metadata: Metadata = {
  title: "Portfolio — Solution Sqauad",
  description: "Explore our portfolio of mobile apps, web platforms, and backend systems.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <PortfolioSection />
    </div>
  );
}
