'use client';   // ← VERY IMPORTANT for Framer Motion in App Router

import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/solution-squad-tech/", icon: "in" },
  { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "◉" },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-600/30">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand - Animated Solution Sqauad */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                className="text-3xl font-display font-bold tracking-tighter text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.04, 
                  letterSpacing: "0.05em" 
                }}
                whileTap={{ scale: 0.97 }}
              >
                Solution Sqauad
              </motion.div>
            </Link>

            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-sm">
              We craft exceptional digital products — mobile apps, web platforms,
              and scalable backend systems that help businesses grow.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-dark-500/50 flex items-center justify-center text-xs font-mono text-[var(--muted)] hover:border-brand-500/50 hover:text-brand-400 hover:bg-brand-dim transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-[var(--foreground)]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-[var(--foreground)]">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:solutiontionsquad.tech@gmail.com"
                  className="text-sm text-[var(--muted)] hover:text-brand-400 transition-colors"
                >
                  solutiontionsquad.tech@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-sm text-[var(--muted)] hover:text-brand-400 transition-colors"
                >
                  +8801601002224
                </a>
              </li>
              <li className="text-sm text-[var(--muted)]">
             Gulshan 1 , Dhaka , Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-600/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Solution Sqauad. All rights reserved.
          </p>
    
        </div>
      </div>
    </footer>
  );
}