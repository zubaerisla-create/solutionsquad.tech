"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Smartphone, Globe, Bot } from "lucide-react";

const FLOATING_WORDS = [
  "React Native", "Flutter", "Next.js", "NestJS", "FastAPI",
  "TypeScript", "Node.js", "Docker", "PostgreSQL", "GraphQL", "AI", "LLM"
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ y: y2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-brand-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] border border-accent-500/10 rounded-full"
        />

        {/* Floating tech words */}
        {FLOATING_WORDS.map((word, i) => (
          <motion.span
            key={word}
            className="absolute font-mono text-xs text-brand-500/20 dark:text-brand-400/15 whitespace-nowrap select-none"
            style={{
              left: `${5 + (i * 9.5) % 85}%`,
              top: `${10 + (i * 17) % 75}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 section-container pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-dim mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="font-mono text-xs text-brand-400 tracking-widest uppercase">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tighter mb-6"
          >
            We Build
            <br />
            <span className="relative inline-block">
              <span className="gradient-text">Digital Products</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 to-accent-400 origin-left"
              />
            </span>
            <br />
            {/* ✅ একই লাইনে, "Faster" ছোট */}
            <span className="inline-flex items-baseline gap-3 flex-wrap justify-center">
            
              <span className="relative inline-block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter bg-gradient-to-r from-brand-400 via-accent-400 to-violet-400 bg-clip-text text-transparent">
              That Move  Faster
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.8 }}
                  className="absolute -right-3 top-0 text-brand-400 text-3xl"
                >
                  _
                </motion.span>
              </span>
            </span>
          </motion.h1>

          {/* Service Highlights — Lucide icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center justify-center gap-3 mb-8 flex-wrap"
          >
            <div className="px-5 py-2 bg-zinc-900/70 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm font-medium text-white/90 flex items-center gap-2 hover:border-brand-400/50 transition-colors">
              <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile Apps
            </div>
            <div className="px-5 py-2 bg-zinc-900/70 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm font-medium text-white/90 flex items-center gap-2 hover:border-brand-400/50 transition-colors">
              <Globe className="w-4 h-4 text-blue-400" /> Websites
            </div>
            <div className="px-5 py-2 bg-zinc-900/70 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm font-medium text-white/90 flex items-center gap-2 hover:border-brand-400/50 transition-colors">
              <Bot className="w-4 h-4 text-purple-400" /> AI Development
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            From sleek mobile apps to powerful web platforms and intelligent AI solutions — we deliver{" "}
            <span className="text-brand-400 font-medium">end-to-end</span> digital excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#portfolio" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
              View Our Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="#contact" className="btn-secondary text-base px-8 py-3.5">
              Get In Touch
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "50+", label: "Apps Shipped" },
              { value: "98%", label: "Client Retention" },
              { value: "7yr", label: "In Business" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-black text-3xl text-brand-400">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-[var(--muted)] mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-[var(--muted)] tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-dark-500 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-brand-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}