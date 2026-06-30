"use client";

import React, { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Code2, Cpu, Database, Blocks, Terminal } from "lucide-react";

type SkillCategory = "languages" | "frameworks" | "databases" | "cloud" | "ai";

interface Skill {
  name: string;
  tag: string;
}

interface SkillsData {
  languages: Skill[];
  frameworks: Skill[];
  databases: Skill[];
  cloud: Skill[];
  ai: Skill[];
}

export default function SkillSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("languages");

  const categories = [
    {
      id: "languages",
      name: "Languages",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: "frameworks",
      name: "Backend & Frameworks",
      icon: <Blocks className="w-4 h-4" />,
    },
    {
      id: "databases",
      name: "Databases",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: <Terminal className="w-4 h-4" />,
    },
    {
      id: "ai",
      name: "AI & Automation",
      icon: <Cpu className="w-4 h-4" />,
    },
  ];

  const skillsData: SkillsData = {
    languages: [
      { name: "Golang", tag: "Language" },
      { name: "TypeScript", tag: "Language" },
      { name: "JavaScript", tag: "Language" },
      { name: "Python", tag: "Language" },
      { name: "Dart", tag: "Language" },
      { name: "PHP", tag: "Language" },
      { name: "Kotlin", tag: "Language" },
      { name: "Swift", tag: "Language" },
      { name: "Java", tag: "Language" },
      { name: "C++", tag: "Language" },
      { name: "C#", tag: "Language" },
    ],
    frameworks: [
      // Backend
      { name: "Node.js", tag: "Backend" },
      { name: "Express.js", tag: "Backend" },
      { name: "Gin", tag: "Backend" },
      { name: "FastAPI", tag: "Backend" },
      { name: "Laravel", tag: "Backend" },
      { name: "CodeIgniter", tag: "Backend" },
      { name: "Flask", tag: "Backend" },
      { name: ".NET", tag: "Backend" },
      // Mobile
      { name: "Flutter", tag: "Mobile" },
      { name: "React Native", tag: "Mobile" },
      { name: "Expo", tag: "Mobile" },
      // Web
      { name: "React.js", tag: "Web" },
      { name: "Next.js", tag: "Web" },
      { name: "Vue.js", tag: "Web" },
      { name: "Angular", tag: "Web" },
    ],
    databases: [
      { name: "PostgreSQL", tag: "RDBMS" },
      { name: "MongoDB", tag: "NoSQL" },
      { name: "Redis", tag: "In-Memory" },
      { name: "Supabase", tag: "BaaS" },
      { name: "Neo4j", tag: "Graph DB" },
    ],
    cloud: [
      { name: "AWS", tag: "Cloud" },
      { name: "Cloudflare", tag: "CDN & DNS" },
      { name: "DigitalOcean", tag: "Cloud" },
      { name: "Docker", tag: "Container" },
      { name: "CI/CD", tag: "Pipeline" },
      { name: "GitHub Actions", tag: "Automation" },
      { name: "Linux", tag: "OS" },
      { name: "Coolify", tag: "PaaS" },
      { name: "Prometheus", tag: "Monitoring" },
      { name: "Grafana", tag: "Visualization" },
      { name: "Loki", tag: "Logging" },
      { name: "Alertmanager", tag: "Alerts" },
    ],
    ai: [
      { name: "Local LLMs", tag: "AI/ML" },
      { name: "Ollama", tag: "AI/ML" },
      { name: "DeepSeek", tag: "AI/ML" },
      { name: "AI Agents", tag: "AI/ML" },
      { name: "RAG Pipelines", tag: "AI/ML" },
      { name: "Whisper ASR", tag: "AI/ML" },
      { name: "Text-to-Speech", tag: "AI/ML" },
      { name: "Workflow Automation", tag: "Automation" },
      { name: "n8n", tag: "Automation" },
      { name: "Git", tag: "Version Control" },
      { name: "GitHub", tag: "Collaboration" },
      { name: "ClickUp", tag: "PM Tool" },
    ],
  };

  const getCategoryIcon = (cat: SkillCategory) => {
    switch (cat) {
      case "languages":
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "frameworks":
        return <Blocks className="w-5 h-5 text-emerald-400" />;
      case "databases":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "cloud":
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case "ai":
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative w-full py-20 overflow-hidden bg-slate-950 border-t border-slate-900"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/[0.01] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tight text-white">
            Tech <span className="text-emerald-400">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Scalable tech stacks and modern architectures optimized for performance and reliability.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`
                px-5 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 border
                ${
                  activeCategory === category.id
                    ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }
              `}
              onClick={() => setActiveCategory(category.id as SkillCategory)}
            >
              {category.icon}
              {category.name.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-800/80 hover:border-emerald-500/20 transition-all duration-300 overflow-hidden">
                  <div className="relative z-10 flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 group-hover:border-emerald-500/10 transition-colors">
                      {getCategoryIcon(activeCategory)}
                    </div>

                    {/* Skill name */}
                    <div>
                      <h4 className="text-white group-hover:text-emerald-400 font-bold text-sm tracking-wide transition-colors duration-200">
                        {skill.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{skill.tag}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
