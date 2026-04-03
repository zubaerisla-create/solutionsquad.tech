"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Server, 
  Palette, 
  Zap 
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  "Code2": Code2,
  "Smartphone": Smartphone,
  "Globe": Globe,
  "Server": Server,
  "Palette": Palette,
  "Zap": Zap,
  // Add more if your SERVICES data has different icon names
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

      {/* Background blobs */}
      <div className="absolute left-1/4 top-1/4 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          label="What We Do"
          title={
            <>
              Services built for{" "}
              <span className="gradient-text">scale</span>
            </>
          }
          subtitle="End-to-end software development from product discovery to deployment — we cover the full spectrum."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {SERVICES.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon] || Code2; // fallback

            return (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative p-8 rounded-2xl border border-dark-600/40 bg-dark-800/30 backdrop-blur-sm hover:border-transparent overflow-hidden"
              >
                {/* Gradient border on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`}
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}20, transparent 60%)`,
                    boxShadow: `inset 0 0 0 1px ${service.accent}30`,
                  }}
                />

                {/* Top gradient bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Lucide Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${service.accent}15` }}
                >
                  <IconComponent 
                    className="w-8 h-8" 
                    strokeWidth={2.25}
                    style={{ color: service.accent }}
                  />
                </div>

                <h3 className="font-display font-bold text-xl mb-3 group-hover:text-[var(--foreground)] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: service.accent }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <div className="mt-8 pt-6 border-t border-dark-600/40">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-display font-semibold transition-colors duration-200 group/link"
                    style={{ color: service.accent }}
                  >
                    Start a Project
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Index number */}
                <div className="absolute top-6 right-6 font-mono text-5xl font-black opacity-5 group-hover:opacity-10 transition-opacity select-none">
                  0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-dim to-accent-dim text-center"
        >
          <p className="font-display font-semibold text-lg mb-4">
            Not sure what you need? Let's figure it out together.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}