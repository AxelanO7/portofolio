"use client";

import React, { useState, useRef } from "react";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";

import imgSiapenku from "@/public/siapenku.png";
import imgKoi from "@/public/koi.png";
import imgSmartBtw from "@/public/smartbtw.png";
import imgJobseekerApp from "@/public/jobseeker_app.png";
import imgJobseekerPartners from "@/public/jobseeker_partners.png";
import imgBtwEdutech from "@/public/btwedutech.png";
import imgVillaManis from "@/public/villa_manis.png";
import imgBnShop from "@/public/bn_shop.png";
import imgTeacherPayroll from "@/public/teacher_payroll.png";
import imgSujana from "@/public/sujana.png";

interface Project {
  id: number;
  name: string;
  role: string;
  description: string;
  image: StaticImageData | null;
  techStack: string[];
  link?: string;
  tag: string;
  category: "cto" | "freelance";
}

const projects: Project[] = [
  // === CTO @ New Directions Success ===
  {
    id: 1,
    name: "Guestlist — Microservices Backend",
    role: "CTO & Lead Architect",
    description:
      "API Gateway + 6 backend services (User, Transaction, Affiliate, Service, Event, Recruitment) with DOKU payment, Firebase FCM, and clean architecture.",
    image: null,
    techStack: ["Go", "Gin", "PostgreSQL", "MongoDB", "JWT", "Docker"],
    tag: "Backend",
    category: "cto",
  },
  {
    id: 2,
    name: "Guestlist — Mobile App",
    role: "CTO & Lead Architect",
    description:
      "End-user booking app for entertainment & experience discovery in Bali. Cross-platform iOS/Android with Redux state management.",
    image: null,
    techStack: ["React Native", "Expo", "Redux"],
    tag: "Mobile",
    category: "cto",
  },
  {
    id: 3,
    name: "Guestlist — Web Platform",
    role: "CTO & Lead Architect",
    description:
      "Responsive web booking platform with affiliate system, itinerary builder, and full event discovery experience.",
    image: null,
    techStack: ["Next.js 16", "React 19", "Redux", "Tailwind"],
    tag: "Web",
    category: "cto",
  },
  {
    id: 4,
    name: "Guestlist — Partner Mobile",
    role: "CTO & Lead Architect",
    description:
      "Affiliate & partner app for commission tracking and QR-based attendance scanning at events.",
    image: null,
    techStack: ["React Native", "Expo", "Redux"],
    tag: "Mobile",
    category: "cto",
  },
  {
    id: 5,
    name: "Guestlist — Back Office",
    role: "CTO & Lead Architect",
    description:
      "Internal admin dashboard for managing Admin, Affiliate, Partnership, and Sales modules with comprehensive HeroUI interface.",
    image: null,
    techStack: ["Next.js 16", "HeroUI", "TypeScript"],
    tag: "Web",
    category: "cto",
  },
  {
    id: 6,
    name: "Guestlist — Landing Page",
    role: "CTO & Lead Architect",
    description:
      "Public marketing landing page with business info, affiliate program, and partnership content for Guestlist.",
    image: null,
    techStack: ["Next.js", "Tailwind"],
    tag: "Web",
    category: "cto",
  },
  {
    id: 7,
    name: "Guestlist — Link & Discovery",
    role: "CTO & Lead Architect",
    description:
      "Event discovery and booking microsite — public-facing link platform for event listings and direct bookings.",
    image: null,
    techStack: ["Next.js", "TypeScript"],
    tag: "Web",
    category: "cto",
  },
  {
    id: 8,
    name: "Guestlist — Dynamic Form Builder",
    role: "CTO & Lead Architect",
    description:
      "Dynamic form builder for event registration with client/server validation and export. Used across Guestlist event ops.",
    image: null,
    techStack: ["Next.js", "TypeScript"],
    tag: "Web",
    category: "cto",
  },
  {
    id: 9,
    name: "Guestlist — QA Automation",
    role: "CTO & Lead Architect",
    description:
      "End-to-end test automation suite for the Guestlist web platform ensuring reliability across booking flows.",
    image: null,
    techStack: ["Cypress", "TypeScript"],
    tag: "QA",
    category: "cto",
  },
  {
    id: 10,
    name: "IT Pulse — Internal Support System",
    role: "CTO & Lead Architect",
    description:
      "Internal IT support system for ticket management, scheduling, attendance tracking, and Discord integration.",
    image: null,
    techStack: ["Next.js", "TypeScript", "Discord API"],
    tag: "Internal",
    category: "cto",
  },
  {
    id: 11,
    name: "Lerka — AI Chat Platform",
    role: "CTO & Lead Architect",
    description:
      "Full AI chat ecosystem: Go API Gateway, Python FastAPI AI backend (Ollama + OpenRouter), React Native mobile, and Next.js web with real-time streaming and multi-model comparison.",
    image: null,
    techStack: ["Go", "Python", "FastAPI", "Ollama", "React Native", "Next.js"],
    tag: "AI",
    category: "cto",
  },
  // === Freelance ===
  {
    id: 12,
    name: "Jobseeker App",
    role: "Senior Mobile Engineer",
    description:
      "Social-first job search platform with skill-based matching and instant opportunities. Published on Google Play.",
    image: imgJobseekerApp,
    techStack: ["Flutter", "Node.js", "MongoDB"],
    link: "https://play.google.com/store/apps/details?id=com.jobseeker.app&hl=id",
    tag: "Mobile",
    category: "freelance",
  },
  {
    id: 13,
    name: "Jobseeker Partners",
    role: "Senior Mobile Engineer",
    description:
      "Partner app for businesses to post jobs and manage applicants with fast matching and skill filters.",
    image: imgJobseekerPartners,
    techStack: ["Flutter"],
    link: "https://play.google.com/store/apps/details?id=com.jobseeker.partners&hl=id",
    tag: "Mobile",
    category: "freelance",
  },
  {
    id: 14,
    name: "Smart BTW",
    role: "Mobile Engineering Lead",
    description:
      "Job preparation simulator with realistic tryout simulations, interactive exercises, and performance analytics.",
    image: imgSmartBtw,
    techStack: ["Flutter", "Firebase"],
    tag: "Mobile",
    category: "freelance",
  },
  {
    id: 15,
    name: "BTW Edutech Platform",
    role: "Mobile Engineering Lead",
    description:
      "Full educational platform for skill development and career preparation across iOS, Android, and Web.",
    image: imgBtwEdutech,
    techStack: ["Flutter", "React", "Firebase"],
    tag: "Platform",
    category: "freelance",
  },
  {
    id: 16,
    name: "KOI Campus Platform",
    role: "Full-Stack Engineer",
    description:
      "Campus community platform optimizing student–organization interactions with event management and activity tracking.",
    image: imgKoi,
    techStack: ["React", "Go", "PostgreSQL"],
    link: "https://github.com/AxelanO7/koi-frontend-web-js",
    tag: "Web",
    category: "freelance",
  },
  {
    id: 17,
    name: "Siapenku",
    role: "Full-Stack Engineer",
    description:
      "Administrative data management for village governance — population data, letter management, and service delivery.",
    image: imgSiapenku,
    techStack: ["Laravel", "Vue.js", "MySQL"],
    link: "http://siapenku.stion.site",
    tag: "Web",
    category: "freelance",
  },
  {
    id: 18,
    name: "Villa Manis FinTech",
    role: "Full-Stack Engineer",
    description:
      "Financial reporting and accounting system for the hospitality industry with real-time analytics.",
    image: imgVillaManis,
    techStack: ["React", "Go", "PostgreSQL"],
    tag: "FinTech",
    category: "freelance",
  },
  {
    id: 19,
    name: "BN Shop Inventory",
    role: "Full-Stack Engineer",
    description:
      "Smart inventory management with real-time stock tracking, automated reorder alerts, and analytics dashboard.",
    image: imgBnShop,
    techStack: ["React", "Go", "Redis"],
    tag: "Web",
    category: "freelance",
  },
  {
    id: 20,
    name: "Teacher Payroll",
    role: "Mobile & Backend Engineer",
    description:
      "HR management mobile app with attendance tracking, leave management, and digital payroll for schools.",
    image: imgTeacherPayroll,
    techStack: ["Flutter", "Laravel", "MySQL"],
    tag: "Mobile",
    category: "freelance",
  },
  {
    id: 21,
    name: "Sujana Travel",
    role: "Full-Stack Engineer",
    description:
      "Tour & travel booking system with integrated payment processing, itinerary management, and customer portal.",
    image: imgSujana,
    techStack: ["React", "Go", "Stripe API"],
    tag: "Web",
    category: "freelance",
  },
];

const tagColor: Record<string, string> = {
  Backend: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Mobile: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Web: "bg-slate-700/60 text-slate-300 border-slate-700",
  Platform: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  FinTech: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  AI: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  QA: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Internal: "bg-slate-600/60 text-slate-300 border-slate-600",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={itemVariants} className="group h-full">
      <div className="h-full flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
        {/* Image / Placeholder */}
        <div className="relative h-40 overflow-hidden bg-slate-900 flex-shrink-0">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${tagColor[project.tag] ?? "bg-slate-800 text-slate-400 border-slate-700"}`}>
              {project.tag}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-slate-950/80 backdrop-blur rounded-lg border border-slate-700 hover:border-emerald-500/30"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 space-y-2.5">
          <div>
            <p className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1">
              {project.role}
            </p>
            <h3 className="text-sm font-bold text-white leading-snug">
              {project.name}
            </h3>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed flex-1 font-light">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 bg-slate-800/80 text-slate-300 text-[10px] font-mono rounded-md border border-slate-700/60">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type FilterType = "all" | "cto" | "freelance";

export default function ProjectSection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.05 });

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const ctoCount = projects.filter((p) => p.category === "cto").length;
  const freelanceCount = projects.filter((p) => p.category === "freelance").length;

  return (
    <section id="projects" className="relative w-full py-20 overflow-hidden bg-slate-950 border-t border-slate-900">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tight text-white">
            Selected <span className="text-emerald-400">Work</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Production systems and platforms shipped across mobile, web, backend, cloud, and AI infrastructure.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {([
            { key: "all", label: `All  (${projects.length})` },
            { key: "cto", label: `CTO @ NDS  (${ctoCount})` },
            { key: "freelance", label: `Freelance  (${freelanceCount})` },
          ] as { key: FilterType; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider border transition-all duration-200 ${
                filter === key
                  ? "bg-emerald-500 border-emerald-500 text-slate-950"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-6 pt-12 border-t border-slate-900 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: `${projects.length}+`, label: "Projects Shipped" },
            { number: "6+", label: "Years Building" },
            { number: "5+", label: "Tech Domains" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-black text-emerald-400">{stat.number}</div>
              <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
