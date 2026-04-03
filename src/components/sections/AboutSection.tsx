"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/utils";
import { Target, Search, Handshake, Rocket, ExternalLink } from "lucide-react";

const VALUES = [
  { 
    icon: Target, 
    title: "Outcome-Driven", 
    desc: "We don't just write code — we solve business problems." 
  },
  { 
    icon: Search, 
    title: "Quality First", 
    desc: "Rigorous code review, testing, and performance tuning on every project." 
  },
  { 
    icon: Handshake, 
    title: "True Partnership", 
    desc: "Transparent communication and collaboration from kickoff to launch." 
  },
  { 
    icon: Rocket, 
    title: "Ship Fast", 
    desc: "Agile sprints that get your product to market without sacrificing quality." 
  },
];

const TEAM = [
  {
    name: "Nazmul Hasan",
    role: "ERP & AWS Specialist",
    bio: "Odoo & AWS expert, helping businesses streamline operations and scale with cloud solutions.",
    avatar: "https://i.ibb.co.com/5hTqddFj/nazmol01.jpg",
    linkedin: "https://www.linkedin.com/in/nazmul-hasan-b3b990369/",
    skills: ["Odoo", "AWS", "ERP"],
  },
  {
    name: "Abu Hayat",
    role: "Frontend Developer",
    bio: "React, Next.js & Node.js developer crafting innovative web solutions.",
    avatar: "https://i.ibb.co.com/b5g4tH0s/hayat01.jpg",
    linkedin: "https://www.linkedin.com/in/abu-hayat-716a49328/",
    skills: ["React", "Next.js", "MongoDB"],
  },
  {
    name: "Abdullah Al Zubaer",
    role: "Full Stack Developer",
    bio: "Full Stack Dev @ Join Venture AI. Competitive programmer, Codeforces 1320.",
    avatar: "https://i.ibb.co.com/dwD88L5H/abdullah.jpg",
    linkedin: "https://www.linkedin.com/in/abdullah-al-zubaer-309065292/?skipRedirect=true",
    skills: ["TypeScript", "Golang", "Docker"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="section-label">
              <span className="w-6 h-px bg-brand-400" />
              About Us
              <span className="w-6 h-px bg-brand-400" />
            </motion.span>

            <motion.h2 variants={fadeInUp} className="section-title mt-2 mb-6">
              Engineers who{" "}
              <span className="gradient-text">give a damn</span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                Solution Sqauad was founded in 2018 by a team of engineers who were
                tired of seeing great ideas fail due to poor technical execution.
                We set out to build a studio where craft, speed, and honesty aren't
                trade-offs — they're the standard.
              </p>
              <p>
                Today, we're a tight-knit team of{" "}
                <span className="text-brand-400 font-medium">12 engineers and designers</span>{" "}
                who've shipped products for startups, scale-ups, and Fortune 500s
                alike — across mobile, web, and backend.
              </p>
              <p>
                Our mission is simple: turn your vision into software that users
                love and that your business can grow on.
              </p>
            </motion.div>

            {/* Values grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4 mt-10"
            >
              {VALUES.map((v) => {
                const IconComponent = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    variants={fadeInUp}
                    className="p-4 rounded-xl border border-dark-600/40 hover:border-brand-500/40 bg-dark-800/30 hover:bg-brand-dim transition-all duration-300 group"
                  >
                    <IconComponent
                      className="w-8 h-8 mb-3 text-brand-400 group-hover:text-brand-500 transition-colors"
                      strokeWidth={2.25}
                    />
                    <h4 className="font-display font-semibold text-sm mb-1 group-hover:text-brand-400 transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right — Team */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-brand-400/40 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-accent-400/40 rounded-br-lg" />

              <div className="p-6 rounded-2xl border border-dark-600/40 bg-dark-800/30 backdrop-blur-sm">
                <h3 className="font-display font-semibold text-lg mb-6 text-center">
                  Meet The Team
                </h3>

                {/* 3-column layout for exactly 3 members */}
                <div className="grid grid-cols-3 gap-4">
                  {TEAM.map((member, i) => (
                    <motion.a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="group text-center p-3 rounded-xl hover:bg-brand-dim transition-all duration-300 cursor-pointer block"
                    >
                      {/* Larger Square Avatar */}
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-dark-500 group-hover:border-brand-400/70 transition-all duration-300 shadow-lg">
                          <Image
                            src={member.avatar}
                            alt={member.name}
                            width={200}     // Increased resolution
                            height={200}    // Square shape
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>

                        {/* Online dot */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-400 border-2 border-dark-800" />

                        {/* LinkedIn hover overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-brand-500/0 group-hover:bg-brand-500/20 transition-all duration-300 flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      <h4 className="font-display font-semibold text-xs leading-tight group-hover:text-brand-400 transition-colors mb-0.5">
                        {member.name}
                      </h4>
                      <p className="text-[10px] text-brand-400 mb-1.5 font-medium">{member.role}</p>
                      <p className="text-[10px] text-[var(--muted)] leading-relaxed mb-2 hidden sm:block">
                        {member.bio}
                      </p>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Mini mission statement */}
                <div className="mt-6 pt-5 border-t border-dark-600/40 text-center">
                  <p className="font-mono text-xs text-[var(--muted)] italic">
                    "We don't just build software — we build{" "}
                    <span className="text-brand-400">businesses</span>."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}