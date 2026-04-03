"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_STACK } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { 
  Smartphone, 
  Globe, 
  Server, 
  Database, 
  Cloud, 
  Code2, 
  Zap, 
  Cpu 
} from "lucide-react";

const CATEGORIES = [
  { name: "Mobile", icon: Smartphone, color: "#14b8a6" },
  { name: "Web", icon: Globe, color: "#8b5cf6" },
  { name: "Backend", icon: Server, color: "#f97316" },
  { name: "Database", icon: Database, color: "#22d3ee" },
  { name: "DevOps", icon: Cloud, color: "#06b6d4" },
];

function MarqueeRow({ items, reverse = false }: { items: typeof TECH_STACK; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
        className="flex gap-6 flex-shrink-0 py-2"
      >
        {[...items, ...items].map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl border border-dark-600/50 bg-dark-900/50 backdrop-blur-xl hover:border-brand-500/40 hover:bg-dark-800/80 transition-all duration-300 shadow-sm"
          >
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-dark-700/50 group-hover:border-brand-500/30 transition-colors"
              style={{ backgroundColor: `${tech.color}15` }}
            >
              <span 
                className="text-2xl transition-transform group-hover:scale-110"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-white group-hover:text-brand-400 transition-colors">
                {tech.name}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-dark-500">
                {tech.category}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section 
      id="stack" 
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-dark-950"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(139,92,246,0.08),transparent_70%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="section-container relative">
        <SectionHeader
          label="Tech Stack"
          title={
            <>
              Tools we <span className="gradient-text">master</span>
            </>
          }
          subtitle="Carefully chosen technologies that power exceptional digital experiences."
        />

        {/* Infinite Marquee */}
        <div className="mt-16 space-y-8">
          <motion.div style={{ y: y1 }}>
            <MarqueeRow items={TECH_STACK.slice(0, 8)} />
          </motion.div>
          
          <motion.div style={{ y: y2 }}>
            <MarqueeRow items={TECH_STACK.slice(8)} reverse />
          </motion.div>
        </div>

        {/* Categorized Grid */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
            <p className="font-mono text-xs uppercase tracking-[3px] text-brand-400">By Category</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid gap-10"
          >
            {CATEGORIES.map((cat, index) => {
              const filteredItems = TECH_STACK.filter((t) => t.category === cat.name);
              if (filteredItems.length === 0) return null;

              const IconComponent = cat.icon;

              return (
                <motion.div 
                  key={cat.name} 
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-dark-900 border border-dark-700 flex items-center justify-center">
                      <IconComponent 
                        size={26} 
                        className="text-white/90" 
                        strokeWidth={2.25}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-dark-500">
                        {filteredItems.length} technologies
                      </p>
                    </div>
                    <div className="flex-1 h-px bg-dark-800 ml-6" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {filteredItems.map((tech) => (
                      <motion.div
                        key={tech.name}
                        whileHover={{ scale: 1.04, y: -3 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-dark-700/60 bg-dark-900/60 hover:border-brand-500/30 hover:bg-dark-800 backdrop-blur-sm transition-all duration-300 group/item"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                        >
                          <span className="text-xl">{tech.icon}</span>
                        </div>
                        <span className="font-medium text-[15px] text-[var(--foreground)] group-hover/item:text-white transition-colors">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Languages & Runtimes", count: "8+", icon: Code2 },
            { label: "Frameworks & Tools", count: "20+", icon: Cpu },
            { label: "Cloud & Infrastructure", count: "15+", icon: Zap },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group p-8 rounded-3xl border border-dark-700/50 bg-dark-900/40 hover:border-brand-500/20 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={32} className="text-brand-400" />
                </div>
                <div className="font-display font-black text-5xl text-white mb-2 tracking-tighter">
                  {stat.count}
                </div>
                <div className="text-sm text-[var(--muted)] font-medium">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}