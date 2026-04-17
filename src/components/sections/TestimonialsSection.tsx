"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-amber-400" : "text-dark-500"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" />

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <SectionHeader
          label="Client Reviews"
          title={
            <>
              What our clients{" "}
              <span className="gradient-text">say</span>
            </>
          }
          subtitle="Don't just take our word for it — here's what the people we've built for have to say."
        />

        {/* Featured quote (large, active) */}
        <div className="mt-16 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative p-8 lg:p-12 rounded-2xl border border-dark-600/40 bg-dark-800/30 backdrop-blur-sm text-center"
            >
              {/* Quote mark */}
              <div className="absolute top-6 left-8 font-display text-8xl text-brand-400/10 leading-none select-none">
                "
              </div>

              <StarRating rating={TESTIMONIALS[activeIndex].rating} />

              <blockquote className="mt-6 text-lg lg:text-xl text-[var(--foreground)] leading-relaxed font-display font-medium max-w-3xl mx-auto">
                "{TESTIMONIALS[activeIndex].text}"
              </blockquote>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-400/30">
                  <Image
                    src={TESTIMONIALS[activeIndex].avatar}
                    alt={TESTIMONIALS[activeIndex].name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-sm">
                    {TESTIMONIALS[activeIndex].name}
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {TESTIMONIALS[activeIndex].role} at{" "}
                    <span className="text-brand-400">{TESTIMONIALS[activeIndex].company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-8 h-2 bg-brand-400"
                    : "w-2 h-2 bg-dark-500 hover:bg-dark-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All testimonials grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              variants={fadeInUp}
              onClick={() => setActiveIndex(i)}
              className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                i === activeIndex
                  ? "border-brand-500/40 bg-brand-dim"
                  : "border-dark-600/40 bg-dark-800/20 hover:border-dark-500"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-dark-600/50 flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-display font-semibold text-xs">{t.name}</div>
                  <div className="text-xs text-[var(--muted)]">{t.company}</div>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="mt-2 text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">
                "{t.text}"
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "40+", label: "Happy Clients" },
            { value: "100%", label: "On-Time Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-3xl text-brand-400">{stat.value}</div>
              <div className="text-xs text-[var(--muted)] mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
