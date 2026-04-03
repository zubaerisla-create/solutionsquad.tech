"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    document
      .querySelectorAll("section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-dark-900/80 dark:bg-dark-900/80 bg-white/80 backdrop-blur-xl border-b border-dark-600/30"
            : "bg-transparent"
        )}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
      {/* Premium Solution Sqauad Logo */}
<Link href="/" className="flex items-center gap-3 group">
  
  
  <div>
    <span className="font-display font-extrabold text-3xl tracking-[-2px] text-white">
      Solution
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Squad</span>
    </span>
    <p className="text-[10px] text-zinc-400 -mt-1 tracking-[3px] font-mono">NEXT ERA</p>
  </div>
</Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-display font-medium transition-colors duration-200 rounded-lg",
                      isActive
                        ? "text-brand-400"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-brand-dim rounded-lg"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
            
              <Link href="#contact" className="hidden sm:block btn-primary text-sm py-2 px-5">
                Get In Touch
              </Link>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current block"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-current block"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current block"
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-dark-600/50 lg:hidden"
          >
            <div className="section-container py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 font-display font-medium text-[var(--muted)] hover:text-brand-400 hover:bg-brand-dim rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-dark-600/50">
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center mt-2"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
