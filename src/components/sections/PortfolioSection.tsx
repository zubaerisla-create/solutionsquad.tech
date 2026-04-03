"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/lib/data";
import type { Project } from "@/types";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { 
  Smartphone, 
  Globe, 
  Server, 
  ArrowRight 
} from "lucide-react";

type Filter = "all" | "mobile" | "web" | "backend";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "Web", value: "web" },
  { label: "Backend", value: "backend" },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const IconComponent = 
    project.category === "mobile" ? Smartphone :
    project.category === "web" ? Globe : Server;

  return (
    <motion.div
      layout
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-dark-600/40 bg-dark-800/30 backdrop-blur-sm hover:border-brand-500/30 overflow-hidden transition-all duration-300"
    >
      {/* Image / Gradient placeholder */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-dark-600/50 flex items-center justify-center">
            <IconComponent 
              className="w-10 h-10 text-white/90" 
              strokeWidth={2.25}
            />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-display font-semibold text-sm flex items-center gap-2">
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-dark-900/70 backdrop-blur-sm text-xs font-mono text-brand-400 capitalize border border-brand-500/20">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-lg mb-2 group-hover:text-brand-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-mono rounded-md bg-dark-700/60 text-[var(--muted)] border border-dark-600/40"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-dark-700/60 text-[var(--muted)]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const IconComponent = 
    project.category === "mobile" ? Smartphone :
    project.category === "web" ? Globe : Server;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-dark-600/50 bg-dark-800 overflow-hidden shadow-2xl"
      >
        {/* Header gradient */}
        <div className={`h-56 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
          <div className="w-24 h-24 rounded-2xl bg-dark-800/60 backdrop-blur-sm border border-dark-600/50 flex items-center justify-center">
            <IconComponent 
              className="w-14 h-14 text-white/90" 
              strokeWidth={2}
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-900/60 flex items-center justify-center hover:bg-dark-900 transition-colors text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs text-brand-400 capitalize">{project.category}</span>
              <h2 className="font-display font-bold text-2xl mt-1">{project.title}</h2>
            </div>
            <div className="flex gap-2">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary text-sm py-2 px-4"
                >
                  Live →
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Code
                </a>
              )}
            </div>
          </div>

          <p className="text-[var(--muted)] leading-relaxed mb-6">{project.description}</p>

          <div>
            <h4 className="font-display font-semibold text-sm mb-3 text-[var(--muted)] uppercase tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-sm font-mono rounded-lg bg-dark-700 border border-dark-600/50 text-[var(--foreground)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "all" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" />

      <div className="section-container">
        <SectionHeader
          label="Our Work"
          title={
            <>
              Projects we're{" "}
              <span className="gradient-text">proud of</span>
            </>
          }
          subtitle="A selection of products we've built — from consumer apps to enterprise platforms."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mt-10 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`relative px-5 py-2 rounded-xl text-sm font-display font-medium transition-all duration-300 ${
                filter === f.value
                  ? "text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {filter === f.value && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 bg-brand-500 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal 
             project={selected} 
            onClose={() => setSelected(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}