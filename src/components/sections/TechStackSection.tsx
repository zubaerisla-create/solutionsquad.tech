"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_STACK } from "@/lib/data";
import { ArrowRight } from "lucide-react";

// Floating 3D Icon Component
function FloatingTechIcon({ tech, index, mousePosition }: { 
  tech: typeof TECH_STACK[0]; 
  index: number;
  mousePosition: { x: number; y: number };
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Calculate parallax offset based on mouse position
  const offsetX = (index % 4 - 1.5) * 100;
  const offsetY = Math.floor(index / 4) * 100;
  
  const parallaxX = (mousePosition.x - 0.5) * (20 + index * 2);
  const parallaxY = (mousePosition.y - 0.5) * (20 + index * 2);

  const springConfig = { stiffness: 150, damping: 25 };
  const x = useSpring(parallaxX, springConfig);
  const y = useSpring(parallaxY, springConfig);

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0, scale: 0, rotateX: -90 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      style={{
        x,
        y,
        position: "absolute",
        left: `${20 + (index % 6) * 13}%`,
        top: `${15 + Math.floor(index / 6) * 35}%`,
      }}
      whileHover={{ 
        scale: 1.2, 
        z: 100,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      className="cursor-pointer group"
      onMouseMove={(e) => {
        if (!iconRef.current) return;
        const rect = iconRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateY = ((e.clientX - centerX) / rect.width) * 20;
        const rotateX = -((e.clientY - centerY) / rect.height) * 20;
        setRotation({ x: rotateX, y: rotateY });
      }}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
    >
      <motion.div
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Icon Glow */}
        <motion.div
          className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${tech.color}60, transparent 70%)`,
          }}
        />

        {/* Icon Container */}
        <motion.div
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/[0.08] overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            transform: "translateZ(20px)",
          }}
          whileHover={{
            background: "rgba(255, 255, 255, 0.08)",
            borderColor: `${tech.color}40`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Inner Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${tech.color}20, transparent 70%)`,
            }}
          />

          {/* Icon */}
          <span 
            className="text-4xl relative z-10 transition-transform duration-300 group-hover:scale-110"
            style={{ 
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))",
            }}
          >
            {tech.icon}
          </span>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${tech.color}30 50%, transparent 70%)`,
            }}
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Tech Name Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10"
        >
          <span className="text-xs font-medium text-white">{tech.name}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Cosmic Background with Circles
function CosmicBackground() {
  return (
    <>
      {/* Main Circular Gradient */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.2), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary Circle */}
      <motion.div
        className="absolute top-20 right-40 w-[400px] h-[400px] rounded-full border border-blue-500/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: 360,
        }}
        transition={{ 
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
      />

      {/* Inner Circle */}
      <motion.div
        className="absolute top-32 right-52 w-[250px] h-[250px] rounded-full border border-purple-500/10"
        animate={{
          scale: [1, 1.15, 1],
          rotate: -360,
        }}
        transition={{ 
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
      />

      {/* Small Dots */}
      <motion.div
        className="absolute top-40 right-60 w-3 h-3 rounded-full bg-blue-400/40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-56 right-80 w-2 h-2 rounded-full bg-purple-400/40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </>
  );
}

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="stack" 
      ref={containerRef}
      className="relative min-h-screen py-24 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Cosmic Background */}
      <CosmicBackground />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
      </div>

      <motion.div 
        className="section-container relative z-10"
        style={{ opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Along with your favorite{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-400 leading-relaxed max-w-lg"
              >
                Clean code, ready to integrate with the tools you love.
                <br />
                No learning curve—just plug and play.
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <span className="text-sm font-medium text-white">Read Docs</span>
              <ArrowRight 
                size={16} 
                className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" 
              />
            </motion.button>

            {/* Tech List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-8"
            >
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-4 font-medium">
                Integrated Technologies
              </p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK.slice(0, 8).map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-white/80">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Floating Icons */}
          <div className="relative h-[600px] hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
              style={{ perspective: "1000px" }}
            >
              {TECH_STACK.slice(0, 18).map((tech, index) => (
                <FloatingTechIcon
                  key={tech.name}
                  tech={tech}
                  index={index}
                  mousePosition={mousePosition}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile - Grid View */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:hidden mt-16 grid grid-cols-4 sm:grid-cols-6 gap-4"
        >
          {TECH_STACK.slice(0, 18).map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="relative group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <span className="text-3xl">{tech.icon}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}