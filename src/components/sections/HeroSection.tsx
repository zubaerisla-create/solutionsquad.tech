"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const WORDS   = ["Faster", "Smarter", "Better", "Bolder"];
const STATS   = [
  { target: 50, sfx: "+",  label: "Apps Shipped"    },
  { target: 98, sfx: "%",  label: "Client Retention" },
  { target: 7,  sfx: "yr", label: "In Business"      },
];
const PILLS   = [
  { label: "Mobile Apps",    dot: "#34d399" },
  { label: "Web Platforms",  dot: "#60a5fa" },
  { label: "AI Development", dot: "#c084fc" },
  { label: "Fast Delivery",  dot: "#fbbf24" },
];
const AURORA_COLORS = ["#63ffb4","#38c9ff","#a78bfa","#fb7185","#fbbf24"];

/* ─────────────────────────────────────────
   AURORA CANVAS
───────────────────────────────────────── */
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let animId: number;

    interface Orb {
      x: number; y: number; r: number;
      vx: number; vy: number;
      life: number; maxLife: number; color: string;
    }
    interface Blob { x: number; y: number; ox: number; oy: number; t: number; r: number; color: string; }

    let W = 0, H = 0;
    const orbs: Orb[]  = [];
    const blobs: Blob[] = [];

    function resetOrb(o: Orb) {
      o.x = Math.random() * W; o.y = Math.random() * H;
      o.r  = Math.random() * 2 + 0.5;
      o.vx = (Math.random() - 0.5) * 0.4;
      o.vy = (Math.random() - 0.5) * 0.4;
      o.life = 0; o.maxLife = 200 + Math.random() * 300;
      o.color = AURORA_COLORS[Math.floor(Math.random() * AURORA_COLORS.length)];
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      for (let i = 0; i < 140; i++) {
        const o = {} as Orb; resetOrb(o); orbs.push(o);
      }
      blobs.push(
        { x: W*.2, y: H*.3, ox: W*.2, oy: H*.3, t: 0,   r: W*.45, color: "#63ffb4" },
        { x: W*.8, y: H*.6, ox: W*.8, oy: H*.6, t: 20,  r: W*.4,  color: "#38c9ff" },
        { x: W*.5, y: H*.2, ox: W*.5, oy: H*.2, t: 50,  r: W*.35, color: "#a78bfa" },
        { x: W*.15,y: H*.75,ox:W*.15, oy:H*.75, t: 80,  r: W*.3,  color: "#fb7185" },
      );
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);

      for (const b of blobs) {
        b.t += 0.004;
        b.x = b.ox + Math.sin(b.t) * 80;
        b.y = b.oy + Math.cos(b.t * 0.7) * 60;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.color); g.addColorStop(1, "transparent");
        ctx.save(); ctx.globalAlpha = 0.06; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill(); ctx.restore();
      }

      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy; o.life++;
        if (o.life > o.maxLife || o.x < 0 || o.x > W || o.y < 0 || o.y > H) resetOrb(o);
        const p = o.life / o.maxLife;
        const a = p < 0.2 ? p/0.2 : p > 0.8 ? (1-p)/0.2 : 1;
        ctx.save(); ctx.globalAlpha = a * 0.55;
        ctx.shadowBlur = 8; ctx.shadowColor = o.color;
        ctx.fillStyle = o.color;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI*2); ctx.fill(); ctx.restore();
      }
      animId = requestAnimationFrame(loop);
    }

    init(); loop();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

/* ─────────────────────────────────────────
   WORD CYCLER
───────────────────────────────────────── */
function WordCycler() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-block overflow-hidden align-bottom" style={{ height: "1.05em", minWidth: "4.5ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y: "-100%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="block bg-gradient-to-r from-[#63ffb4] via-[#38c9ff] to-[#a78bfa] bg-clip-text text-transparent"
        >
          {WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target, sfx }: { target: number; sfx: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1-p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref} className="tabular-nums">{n}{sfx}</span>;
}

/* ─────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────── */
export default function HeroSection() {
  const heroRef  = useRef<HTMLElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOp   = useTransform(scrollY, [0, 680], [1, 0]);
  const heroY    = useTransform(scrollY, [0, 680], [0, 500]);

  /* Magnetic cursor glow */
  useEffect(() => {
    const hero = heroRef.current!;
    const glow = glowRef.current!;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      glow.style.left = `${e.clientX - r.left}px`;
      glow.style.top  = `${e.clientY - r.top}px`;
      glow.style.opacity = "1";
    };
    const onLeave = () => { glow.style.opacity = "0"; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => { hero.removeEventListener("mousemove", onMove); hero.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* Stagger variants */
  const cont = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section
      id="hero"
      ref={heroRef}
      className=" sticky top-0 min-h-screen flex items-center overflow-hidden bg-[#020408]"
    >
      {/* Aurora canvas */}
      <AuroraCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] bg-[size:52px_52px]" />

      {/* Vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,transparent_30%,#020408_100%)]" />

      {/* Magnetic glow */}
      <div
        ref={glowRef}
        className="absolute z-[5] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle, rgba(99,255,180,.055) 0%, transparent 65%)" }}
      />

      {/* Corner brackets */}
      <div className="absolute top-5 left-5 w-12 h-12 border-t border-l border-white/[0.07] rounded-tl-md z-[3]" />
      <div className="absolute top-5 right-5 w-12 h-12 border-t border-r border-white/[0.07] rounded-tr-md z-[3]" />
      <div className="absolute bottom-5 left-5 w-12 h-12 border-b border-l border-white/[0.07] rounded-bl-md z-[3]" />
      <div className="absolute bottom-5 right-5 w-12 h-12 border-b border-r border-white/[0.07] rounded-br-md z-[3]" />

      {/* ── CONTENT ── */}
      <motion.div
        style={{ opacity: heroOp, y: heroY }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-32 pb-28 text-center"
      >
        <motion.div variants={cont} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#63ffb4]/25 bg-[#63ffb4]/[0.06] backdrop-blur-sm">
              <motion.span
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#00e476]"
                style={{ boxShadow: "0 0 12px #63ffb4" }}
              />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#63ffb4]">
                Available for new projects
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-black space-y-4 leading-[0.94] tracking-tighter mb-6"
            style={{ fontSize: "clamp(44px,8.5vw,98px)" }}
          >
            {/* Line 1 */}
            <span className="block bg-gradient-to-br from-white via-white/90 to-white/55 bg-clip-text text-transparent">
             
            </span>

            {/* Line 2 */}
            <span className="relative block">
              <span className="bg-gradient-to-r  from-[#636dff] via-[#38c9ff] to-[#a78bfa] bg-clip-text text-transparent">
             We Build Digital Products
              </span>
              {/* <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#63ffb4] via-[#38c9ff] to-[#a78bfa] origin-left rounded-full"
              /> */}
            </span>

            {/* Line 3 — cycling */}
            <span
              className="block font-black tracking-tighter text-white/50 mt-2"
              style={{ fontSize: "clamp(26px,4.5vw,52px)" }}
            >
              That Move <WordCycler />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="bg-gradient-to-r from-[#63ffb4] to-[#38c9ff] bg-clip-text text-transparent ml-0.5"
              >
                _
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-10 font-light"
          >
            From sleek mobile apps to powerful web platforms and intelligent AI —{" "}
            <span className="text-white/70 font-medium">end-to-end</span> digital excellence.
          </motion.p>

          {/* Pills */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {PILLS.map(({ label, dot }) => (
              <motion.div
                key={label}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm text-sm font-medium text-white/75 cursor-default transition-colors duration-250 hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-20">

            {/* Primary — shimmer button */}
            <motion.div className=" text-[#25cf03] my-shadow " whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#portfolio"
                className="  text-[#25cf03]    relative flex items-center gap-2 px-9 py-4 font-bold text-[15px] bg-transparent overflow-hidden"
                
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 20px 50px rgba(99,255,180,.28)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 rgba(99,255,180,0)")}
              >
                {/* Shimmer */}
                <motion.span
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  animate={{ x: ["-200%", "300%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.8 }}
                />
                <span className="relative z-10">View Our Work</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Secondary */}
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="flex items-center gap-2 px-9 py-4 border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm text-white/75 font-semibold text-[15px] hover:border-white/25 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-3 max-w-sm mx-auto rounded-md overflow-hidden border border-white/[0.05]"
            style={{ gap: "1px", background: "rgba(255,255,255,0.05)" }}
          >
            {STATS.map(({ target, sfx, label }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.03 }}
                className="group relative bg-[#07090f] hover:bg-[#0c1018] transition-colors duration-300 px-4 py-6 text-center overflow-hidden cursor-default"
              >
                {/* Top shimmer line on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#63ffb4]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="block text-[26px] font-black bg-gradient-to-br from-[#63ffb4] to-[#38c9ff] bg-clip-text text-transparent mb-1 tabular-nums">
                  <Counter target={target} sfx={sfx} />
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-white/30">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/20">Scroll</span>
        <div className="relative w-px h-11 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#63ffb4] to-transparent"
            style={{ height: "45%" }}
            animate={{ y: ["-100%", "320%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn" }}
          />
        </div>
      </motion.div>
    </section>
  );
}