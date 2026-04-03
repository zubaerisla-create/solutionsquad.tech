"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_STACK } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const CATEGORIES = ["All", "Mobile", "Web", "Backend", "Database", "DevOps", "Language", "API", "Platform"];

// Marquee row component
function MarqueeRow({ items, reverse = false }: { items: typeof TECH_STACK; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 flex-shrink-0"
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-dark-600/40 bg-dark-800/30 backdrop-blur-sm hover:border-brand-500/30 hover:bg-brand-dim transition-all duration-300 group"
          >
            <span
              className="text-xl w-7 h-7 flex items-center justify-center font-mono font-bold text-xs"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </span>
            <span className="font-display font-medium text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection() {
  const row1 = TECH_STACK.slice(0, 8);
  const row2 = TECH_STACK.slice(8);

  return (
    <section id="stack" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          label="Tech Stack"
          title={
            <>
              Tools we{" "}
              <span className="gradient-text">master</span>
            </>
          }
          subtitle="We work with best-in-class technologies across every layer of the stack."
        />

        {/* Marquee rows */}
        <div className="mt-16 space-y-4">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>

        {/* Detailed grid with categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="mt-20"
        >
          {/* Group by category */}
          {["Mobile", "Web", "Backend", "Database", "DevOps"].map((category) => {
            const items = TECH_STACK.filter((t) => t.category === category || t.category === category);
            const filteredItems = TECH_STACK.filter((t) => t.category === category);
            if (filteredItems.length === 0) return null;

            return (
              <motion.div key={category} variants={fadeInUp} className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-xs text-brand-400 uppercase tracking-widest">
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-dark-600/40" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {filteredItems.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-dark-600/40 bg-dark-800/20 hover:bg-dark-800/60 hover:border-dark-500/60 transition-all duration-200 group"
                    >
                      <span
                        className="text-base w-6 h-6 flex items-center justify-center font-mono font-bold text-xs"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </span>
                      <span className="font-display font-medium text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Proficiency callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { label: "Languages & Runtimes", count: "8+", icon: "💻" },
            { label: "Frameworks & Libraries", count: "20+", icon: "📦" },
            { label: "Cloud & DevOps Tools", count: "15+", icon: "☁️" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 p-5 rounded-xl border border-dark-600/40 bg-dark-800/20"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-display font-black text-2xl text-brand-400">
                  {item.count}
                </div>
                <div className="text-sm text-[var(--muted)]">{item.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
