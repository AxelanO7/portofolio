"use client";

import React, { useRef } from "react";
import { m as motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";

import imgSiapenku from "@/public/siapenku.png";
import imgKoi from "@/public/koi.png";
import imgSmartBtw from "@/public/smartbtw.png";
import imgJobseekerApp from "@/public/jobseeker_app.png";
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
}

const projects: Project[] = [
  {
    id: 1,
    name: "Guestlist Ecosystem",
    role: "CTO & Lead Architect",
    description:
      "Digital ecosystem connecting tourism, lifestyle, entertainment, and premium service providers in Bali. Built 4 platforms: consumer web, mobile app, partner portal, and back-office.",
    image: null,
    techStack: ["Next.js", "Go", "Flutter", "PostgreSQL", "Docker", "AWS"],
    tag: "Current",
  },
  {
    id: 2,
    name: "Jobseeker App",
    role: "Senior Mobile Engineer",
    description:
      "Social-first job search platform with skill-based matching and instant opportunities. Published on Google Play.",
    image: imgJobseekerApp,
    techStack: ["Flutter", "Node.js", "MongoDB"],
    link: "https://play.google.com/store/apps/details?id=com.jobseeker.app&hl=id",
    tag: "Mobile",
  },
  {
    id: 3,
    name: "Smart BTW",
    role: "Mobile Engineering Lead",
    description:
      "Job preparation simulator with realistic tryout simulations, interactive exercises, and performance analytics.",
    image: imgSmartBtw,
    techStack: ["Flutter", "Firebase"],
    tag: "Mobile",
  },
  {
    id: 4,
    name: "BTW Edutech Platform",
    role: "Mobile Engineering Lead",
    description:
      "Full educational platform for skill development and career preparation across iOS, Android, and Web.",
    image: imgBtwEdutech,
    techStack: ["Flutter", "React", "Firebase"],
    tag: "Platform",
  },
  {
    id: 5,
    name: "KOI Campus Platform",
    role: "Full-Stack Engineer",
    description:
      "Campus community platform optimizing student–organization interactions with event management and activity tracking.",
    image: imgKoi,
    techStack: ["React", "Go", "PostgreSQL"],
    link: "https://github.com/AxelanO7/koi-frontend-web-js",
    tag: "Web",
  },
  {
    id: 6,
    name: "Siapenku",
    role: "Full-Stack Engineer",
    description:
      "Administrative data management for village governance — population data, letter management, and service delivery.",
    image: imgSiapenku,
    techStack: ["Laravel", "Vue.js", "MySQL"],
    link: "http://siapenku.stion.site",
    tag: "Web",
  },
  {
    id: 7,
    name: "Villa Manis FinTech",
    role: "Full-Stack Engineer",
    description:
      "Financial reporting and accounting system for the hospitality industry with real-time analytics.",
    image: imgVillaManis,
    techStack: ["React", "Go", "PostgreSQL"],
    link: "https://github.com/AxelanO7/villa-manis-frontend-web-js",
    tag: "FinTech",
  },
  {
    id: 8,
    name: "BN Shop Inventory",
    role: "Full-Stack Engineer",
    description:
      "Smart inventory management with real-time stock tracking, automated reorder alerts, and analytics dashboard.",
    image: imgBnShop,
    techStack: ["React", "Go", "Redis"],
    link: "https://github.com/AxelanO7/bn-shop-frontend-web-js",
    tag: "Web",
  },
  {
    id: 9,
    name: "Teacher Payroll",
    role: "Mobile & Backend Engineer",
    description:
      "HR management mobile app with attendance tracking, leave management, and digital payroll for schools.",
    image: imgTeacherPayroll,
    techStack: ["Flutter", "Laravel", "MySQL"],
    link: "https://github.com/AxelanO7/payroll-mobile-flutter",
    tag: "Mobile",
  },
  {
    id: 10,
    name: "Sujana Travel",
    role: "Full-Stack Engineer",
    description:
      "Tour & travel booking system with integrated payment processing, itinerary management, and customer portal.",
    image: imgSujana,
    techStack: ["React", "Go", "Stripe API"],
    link: "https://github.com/AxelanO7/sujana-frontend-web-js",
    tag: "Web",
  },
];

const tagColor: Record<string, string> = {
  Current: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Mobile: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Platform: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Web: "bg-slate-700/60 text-slate-300 border-slate-700",
  FinTech: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={itemVariants} className="group h-full">
      <div className="h-full flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/20 transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.06)]">
        {/* Image / Placeholder */}
        <div className="relative h-44 overflow-hidden bg-slate-900 flex-shrink-0">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 flex items-center justify-center">
              <div className="text-center space-y-2 px-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                </div>
                <p className="text-xs font-mono text-emerald-400/60 uppercase tracking-widest">In Production</p>
              </div>
            </div>
          )}

          {/* Tag badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${tagColor[project.tag] ?? "bg-slate-800 text-slate-400 border-slate-700"}`}>
              {project.tag}
            </span>
          </div>

          {/* Link arrow */}
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
        <div className="flex flex-col flex-1 p-5 space-y-3">
          <div>
            <p className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1">
              {project.role}
            </p>
            <h3 className="text-base font-bold text-white leading-snug">
              {project.name}
            </h3>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed flex-1 font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-slate-800/80 text-slate-300 text-[10px] font-mono rounded-md border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      className="relative w-full py-20 overflow-hidden bg-slate-950 border-t border-slate-900"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            Production systems and platforms shipped across mobile, web, backend, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* Bottom Stats */}
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
              <div className="text-4xl md:text-5xl font-black text-emerald-400">
                {stat.number}
              </div>
              <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
