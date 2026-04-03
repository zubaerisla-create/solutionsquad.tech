"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateCursor = () => {
      const el = document.elementFromPoint(position.x, position.y);
      if (el) {
        const cursor = window.getComputedStyle(el).cursor;
        setIsPointer(cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateCursor);
    };
  }, [position.x, position.y]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      >
        <div
          className={`rounded-full bg-brand-400 transition-all duration-200 ${
            isPointer ? "w-3 h-3" : "w-2 h-2"
          }`}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-300 ${
            isPointer
              ? "border-brand-400/80"
              : "border-brand-400/30"
          }`}
        />
      </motion.div>
    </>
  );
}
