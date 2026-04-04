"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInLeft, fadeInRight } from "@/lib/utils";

// Only non-brand icons (these still exist in Lucide)
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@devcraft.studio",
    href: "solutionsquad.tech@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+8801873858744",
    href: "tel:+8801873858744",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gulshan 1 , Dhaka, Bangladesh",
    href: "#",
  },
 
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: "GitHub" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
  { label: "X", href: "https://twitter.com", icon: "𝕏" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "◉" },
];

const SERVICES_LIST = [
  "Mobile App Development",
  "Web & Frontend Development",
  "Backend & API Development",
  "Full-Stack Project",
  "Technical Consultation",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "656b0aca-062a-43ab-aa98-8a3cdcc252be",
          ...form,
          subject: `New Business Inquiry from ${form.name}`,
          from_name: "Solution Squad Portfolio",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-dark-600/50 bg-dark-800/40 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-brand-500/60 focus:bg-dark-800/60 transition-all duration-200 text-sm font-body";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <SectionHeader
          label="Contact Us"
          title={
            <>
              Let's build something{" "}
              <span className="gradient-text">great</span>
            </>
          }
          subtitle="Tell us about your project and we'll get back to you within 24 hours."
        />

        <div className="grid lg:grid-cols-5 gap-12 mt-16">
          {/* Left — Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact details */}
            <motion.div variants={fadeInLeft} className="space-y-4">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 p-4 rounded-xl border border-dark-600/40 bg-dark-800/20 hover:border-brand-500/30 hover:bg-brand-dim transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-400" />
                    <div>
                      <div className="text-xs text-[var(--muted)] font-mono uppercase tracking-wider mb-0.5">
                        {info.label}
                      </div>
                      <div className="text-sm font-display font-medium group-hover:text-brand-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </motion.div>

           

            {/* Availability card */}
            <motion.div
              variants={fadeInLeft}
              className="p-6 rounded-xl border border-brand-500/20 bg-brand-dim"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="font-mono text-xs text-brand-400 uppercase tracking-wider">
                  Currently Available
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                We're accepting new projects for{" "}
                <span className="text-brand-400 font-medium">Q2 2026</span>. Limited
                spots available — reach out early to secure yours.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Form (unchanged) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInRight}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-2xl border border-dark-600/40 bg-dark-800/30 backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl mb-6">Send us a message</h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="font-display font-bold text-xl mb-2 text-brand-400">
                    Message Sent!
                  </h4>
                  <p className="text-[var(--muted)] text-sm">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : status === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="text-5xl mb-4">❌</div>
                  <h4 className="font-display font-bold text-xl mb-2 text-red-400">
                    Submission Failed
                  </h4>
                  <p className="text-[var(--muted)] text-sm">
                    Something went wrong. Please try again or email us directly at solutionsquad.tech@gmail.com.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-brand-400 hover:underline font-mono uppercase tracking-widest"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Your form fields here - same as before */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select a service</option>
                        {SERVICES_LIST.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select budget</option>
                      <option value="<10k">Less than $10k</option>
                      <option value="10-25k">$10k – $25k</option>
                      <option value="25-50k">$25k – $50k</option>
                      <option value="50-100k">$50k – $100k</option>
                      <option value=">100k">$100k+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
                      Tell us about your project *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your project, goals, timeline, and any technical requirements..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-[var(--muted)]">
                    By submitting, you agree to our privacy policy. We'll never spam you.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}