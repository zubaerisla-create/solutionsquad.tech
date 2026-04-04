"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Target, Search, Handshake, Rocket, ExternalLink, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const VALUES = [
  { icon: Target, title: "Outcome-Driven", desc: "We don't just write code — we solve business problems." },
  { icon: Search, title: "Quality First", desc: "Rigorous code review, testing, and performance tuning on every project." },
  { icon: Handshake, title: "True Partnership", desc: "Transparent communication and collaboration from kickoff to launch." },
  { icon: Rocket, title: "Ship Fast", desc: "Agile sprints that get your product to market without sacrificing quality." },
];

const TEAM = [
  {
    name: "Shahriar Alam",
    role: "Senior Software Developer",
    bio: "Odoo , AWS , Ai , ERP expert, helping businesses streamline operations and scale with cloud solutions.",
    avatar: "https://i.ibb.co.com/PGs66NWd/IMG-20260404-094654.jpg",
    linkedin: "https://www.linkedin.com/in/nazmul-hasan-b3b990369/",
    skills: ["Odoo", "AWS", "ERP"],
    accent: "from-emerald-400 to-teal-500",
  },
    {
    name: "Nazmul Hasan",
    role: "ERP & AWS Specialist",
    bio: "Odoo & AWS expert, helping businesses streamline operations and scale with cloud solutions.",
    avatar: "https://i.ibb.co.com/zT8ZmGpp/IMG-20260404-WA0006-1.jpg",
    linkedin: "https://www.linkedin.com/in/nazmul-hasan-b3b990369/",
    skills: ["Odoo", "AWS", "ERP"],
    accent: "from-emerald-400 to-teal-500",
  },
  {
    name: "Abu Hayat",
    role: "Web & App Development Expart",
    bio: "Passionate Web & App Developer focused on building scalable, user-friendly, and high-performance applications.",
    avatar: "https://i.ibb.co.com/cKHrCJ4j/03e52a60-6223-4dad-9a9e-41f80cda5784.jpg",
    linkedin: "https://www.linkedin.com/in/abu-hayat-716a49328/",
    skills: ["Node.js", "Native", "Flatter", "MySQL", ""],
    accent: "from-blue-400 to-indigo-500",
  },
  {
    name: "Abdullah Al Zubaer",
    role: "Full Stack AI Developer",
    bio: "Versatile full stack developer with expertise in TypeScript, Golang, and Docker.",
    avatar: "https://i.ibb.co.com/V0CSRpJ9/340137c4-126d-4e43-a5de-382ed7f0b249.jpg",
    linkedin: "https://www.linkedin.com/in/abdullah-al-zubaer-309065292/",
    skills: ["TypeScript", "Golang", "Docker", "Python", "Django", "FastAPI"],
    accent: "from-violet-400 to-purple-500",
  },
    {
    name: "Nayeem Miah",
    role: "Backend Development Specialist",
    bio: "Competitive programmer with a passion for building scalable backend systems.",
    avatar: "https://i.ibb.co.com/TBLb9PhN/6233008702516563729.jpg",
    linkedin: "#",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    accent: "from-amber-400 to-orange-500",
  },
  {
    name: "Rabeya Akter Zumur",
    role: "International Sales",
    bio: "A dynamic international sales strategist who excels at turning conversations into long-term partnerships. Known for understanding diverse markets and delivering value-driven solutions that bridge cultures and drive global growth.",
    avatar: "https://i.ibb.co.com/Xxg8kQfQ/image.png",
    linkedin: "#",
    skills: ["Communication", "Sales", "Leadership"],
    accent: "from-rose-400 to-pink-500",
  },
   {
    name: "Swarnali Banik Arpa",
    role: "International Sales Communication",
    bio: "Experienced sales communicator with a knack for building relationships across borders.",
    avatar: "https://i.ibb.co.com/XxPbr8DY/IMG-20260404-094428.jpg",
    linkedin: "#",
    skills: ["Communication", "Sales", "Leadership"],
    accent: "from-amber-400 to-orange-500",
  },
];

const STATS = [
  { value: "50+", label: "Projects Shipped" },
  { value: "98%", label: "Client Retention" },
  { value: "2yr+", label: "In Business" },
  { value: "12+", label: "Team Members" },
];

/* ─────────────────────────────────────────
   VALUE CARD
───────────────────────────────────────── */
function ValueCard({ icon: Icon, title, desc, index }: {
  icon: React.ElementType; title: string; desc: string; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-4 p-5 rounded-md border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-400 overflow-hidden"
    >
      {/* Left accent bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#63ffb4] to-[#38c9ff] origin-top rounded-full"
      />
      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gradient-to-br from-[#63ffb4]/15 to-[#38c9ff]/10 flex items-center justify-center border border-[#63ffb4]/20 group-hover:border-[#63ffb4]/40 transition-colors duration-300">
        <Icon className="w-5 h-5 text-[#63ffb4]" strokeWidth={2} />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-white/90 mb-1 group-hover:text-[#63ffb4] transition-colors duration-300">
          {title}
        </h4>
        <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   TEAM CARD
───────────────────────────────────────── */
function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-md border border-white/[0.07] bg-white/[0.03] overflow-hidden hover:border-white/[0.16] transition-all duration-400 cursor-pointer"
    >
      {/* Top gradient shimmer on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${member.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

      {/* Avatar area */}
      <div className="relative h-44 overflow-hidden bg-white/[0.03]">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-108"
          unoptimized
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-[#020408]/40 to-transparent" />

        {/* LinkedIn icon on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 w-7 h-7 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </motion.div>

        {/* Online dot */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#63ffb4] shadow-[0_0_6px_#63ffb4]" />
          <span className="text-[10px] text-white/60 font-medium">Available</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-bold text-sm text-white/90 group-hover:text-white transition-colors mb-0.5 leading-tight">
          {member.name}
        </h4>
        <p className={`text-[11px] font-semibold mb-2.5 bg-gradient-to-r ${member.accent} bg-clip-text text-transparent`}>
          {member.role}
        </p>
        <p className="text-[11px] text-white/35 leading-relaxed mb-3 line-clamp-2">
          {member.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {member.skills.map((s) => (
            <span
              key={s}
              className="text-[10px] px-2 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.04] text-white/45 group-hover:border-white/[0.14] group-hover:text-white/60 transition-all duration-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   STAT ITEM
───────────────────────────────────────── */
function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 220 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.55, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-3xl font-black bg-gradient-to-br from-[#63ffb4] to-[#38c9ff] bg-clip-text text-transparent tabular-nums mb-1">
        {value}
      </div>
      <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/35">
        {label}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-driven parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgBlobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgBlobY2 = useTransform(scrollYProgress, [0, 1], ["10%", "-8%"]);
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-60, 0]);
  const leftOp = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const rightOp = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  /* Label line reveal */
  const labelRef = useRef(null);
  const labelView = useInView(labelRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden bg-[#020408]"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] bg-[size:52px_52px] pointer-events-none" />

      <motion.div
        style={{ y: bgBlobY }}
        className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-emerald-500/[0.06] blur-[130px] pointer-events-none"
      />
      <motion.div
        style={{ y: bgBlobY2 }}
        className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full bg-violet-500/[0.06] blur-[110px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── SECTION LABEL ── */}
        <div ref={labelRef} className="flex items-center justify-center gap-4 mb-5">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={labelView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 bg-gradient-to-r from-transparent to-[#63ffb4] origin-right rounded-full"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={labelView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#63ffb4]"
          >
            About Us
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={labelView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 bg-gradient-to-r from-[#63ffb4] to-transparent origin-left rounded-full"
          />
        </div>

        {/* ── TOP: STORY + VALUES ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">

          {/* LEFT — Story */}
          <motion.div className="pl-6 md:pl-0" style={{ x: leftX, opacity: leftOp }}>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tighter text-white mb-8">
              Engineers who{" "}
              <span className="bg-gradient-to-r from-[#63ffb4] via-[#38c9ff] to-[#a78bfa] bg-clip-text text-transparent">
                give a damn
              </span>
            </h2>

            <div className="space-y-5 text-white/45 leading-relaxed text-[15px] mb-10">
              <p>
                Solution Squad was founded in 2023 by a team of engineers who were
                tired of seeing great ideas fail due to poor technical execution.
                We set out to build a studio where craft, speed, and honesty aren't
                trade-offs — they're the standard.
              </p>
              <p>
                Today we're a tight-knit team of{" "}
                <span className="text-[#63ffb4] font-semibold">12 engineers and designers</span>{" "}
                who've shipped products for startups, scale-ups, and Fortune 500s
                alike — across mobile, web, and backend.
              </p>
              <p>
                Our mission is simple: turn your vision into software that users
                love and that your business can grow on.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 p-6 rounded-md border border-white/[0.07] bg-white/[0.02] mb-10">
              {STATS.map((s, i) => (
                <StatItem key={s.label} {...s} index={i} />
              ))}
            </div>

            {/* Quote */}
            <div className="relative pl-5 border-l-2 border-[#63ffb4]/40">
              <p className="text-sm text-white/50 italic leading-relaxed">
                "We don't just build software — we build{" "}
                <span className="text-[#63ffb4] not-italic font-semibold">businesses</span>."
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Values */}
          <motion.div style={{ x: rightX, opacity: rightOp }} className="space-y-3 pt-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-6"
            >
              Our Core Values
            </motion.p>
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </motion.div>
        </div>

        {/* ── TEAM SECTION ── */}
        <div>
          {/* Team header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-2"
              >
                The People
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-tight"
              >
                Meet the{" "}
                <span className="bg-gradient-to-r from-[#63ffb4] to-[#38c9ff] bg-clip-text text-transparent">
                  Squad
                </span>
              </motion.h3>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block text-sm text-white/30 max-w-xs text-right leading-relaxed"
            >
              A tight-knit team of craftspeople obsessed with quality.
            </motion.p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}