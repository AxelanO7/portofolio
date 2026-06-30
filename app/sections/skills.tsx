"use client";

import React, { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Code2, Cpu, Database, Blocks, Terminal } from "lucide-react";

type SkillCategory = "languages" | "frameworks" | "databases" | "cloud" | "ai";

interface Skill {
  name: string;
  tag: string;
  slug?: string; // Simple Icons slug
}

interface SkillsData {
  languages: Skill[];
  frameworks: Skill[];
  databases: Skill[];
  cloud: Skill[];
  ai: Skill[];
}

// Simple Icons CDN: https://cdn.simpleicons.org/{slug}/6ee7b7
function SkillIcon({ slug, fallback }: { slug?: string; fallback: React.ReactNode }) {
  if (!slug) return <>{fallback}</>;
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/6ee7b7`}
      alt=""
      className="w-6 h-6"
      loading="lazy"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
}

export default function SkillSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("languages");

  const categories = [
    { id: "languages", name: "Languages", icon: <Code2 className="w-4 h-4" /> },
    { id: "frameworks", name: "Backend & Frameworks", icon: <Blocks className="w-4 h-4" /> },
    { id: "databases", name: "Databases", icon: <Database className="w-4 h-4" /> },
    { id: "cloud", name: "Cloud & DevOps", icon: <Terminal className="w-4 h-4" /> },
    { id: "ai", name: "AI & Automation", icon: <Cpu className="w-4 h-4" /> },
  ];

  const skillsData: SkillsData = {
    languages: [
      { name: "Golang", tag: "Language", slug: "go" },
      { name: "TypeScript", tag: "Language", slug: "typescript" },
      { name: "JavaScript", tag: "Language", slug: "javascript" },
      { name: "Python", tag: "Language", slug: "python" },
      { name: "Dart", tag: "Language", slug: "dart" },
      { name: "PHP", tag: "Language", slug: "php" },
      { name: "Kotlin", tag: "Language", slug: "kotlin" },
      { name: "Swift", tag: "Language", slug: "swift" },
      { name: "Java", tag: "Language", slug: "java" },
      { name: "C++", tag: "Language", slug: "cplusplus" },
      { name: "C#", tag: "Language", slug: "csharp" },
    ],
    frameworks: [
      { name: "Node.js", tag: "Backend", slug: "nodedotjs" },
      { name: "Express.js", tag: "Backend", slug: "express" },
      { name: "Gin", tag: "Backend", slug: "go" },
      { name: "FastAPI", tag: "Backend", slug: "fastapi" },
      { name: "Laravel", tag: "Backend", slug: "laravel" },
      { name: "CodeIgniter", tag: "Backend", slug: "codeigniter" },
      { name: "Flask", tag: "Backend", slug: "flask" },
      { name: ".NET", tag: "Backend", slug: "dotnet" },
      { name: "Flutter", tag: "Mobile", slug: "flutter" },
      { name: "React Native", tag: "Mobile", slug: "react" },
      { name: "Expo", tag: "Mobile", slug: "expo" },
      { name: "React.js", tag: "Web", slug: "react" },
      { name: "Next.js", tag: "Web", slug: "nextdotjs" },
      { name: "Vue.js", tag: "Web", slug: "vuedotjs" },
      { name: "Angular", tag: "Web", slug: "angular" },
    ],
    databases: [
      { name: "PostgreSQL", tag: "RDBMS", slug: "postgresql" },
      { name: "MySQL", tag: "RDBMS", slug: "mysql" },
      { name: "MongoDB", tag: "NoSQL", slug: "mongodb" },
      { name: "Redis", tag: "In-Memory", slug: "redis" },
      { name: "Supabase", tag: "BaaS", slug: "supabase" },
      { name: "Neo4j", tag: "Graph DB", slug: "neo4j" },
    ],
    cloud: [
      { name: "AWS", tag: "Cloud", slug: "amazonaws" },
      { name: "GCP", tag: "Cloud", slug: "googlecloud" },
      { name: "DigitalOcean", tag: "Cloud", slug: "digitalocean" },
      { name: "Cloudflare", tag: "CDN & DNS", slug: "cloudflare" },
      { name: "Docker", tag: "Container", slug: "docker" },
      { name: "GitHub Actions", tag: "Automation", slug: "githubactions" },
      { name: "Linux", tag: "OS", slug: "linux" },
      { name: "Coolify", tag: "PaaS", slug: "coolify" },
      { name: "Prometheus", tag: "Monitoring", slug: "prometheus" },
      { name: "Grafana", tag: "Visualization", slug: "grafana" },
      { name: "Loki", tag: "Logging", slug: "grafana" },
      { name: "Vercel", tag: "Deploy", slug: "vercel" },
      { name: "Nginx", tag: "Server", slug: "nginx" },
    ],
    ai: [
      { name: "Ollama", tag: "AI/ML", slug: "ollama" },
      { name: "OpenAI", tag: "AI/ML", slug: "openai" },
      { name: "DeepSeek", tag: "AI/ML", slug: "deepseek" },
      { name: "Claude / Anthropic", tag: "AI/ML", slug: "anthropic" },
      { name: "RAG Pipelines", tag: "AI/ML" },
      { name: "AI Agents", tag: "AI/ML" },
      { name: "Whisper ASR", tag: "AI/ML", slug: "openai" },
      { name: "n8n", tag: "Automation", slug: "n8n" },
      { name: "Git", tag: "Version Control", slug: "git" },
      { name: "GitHub", tag: "Collaboration", slug: "github" },
      { name: "ClickUp", tag: "PM Tool", slug: "clickup" },
    ],
  };

  const getCategoryIcon = (cat: SkillCategory) => {
    switch (cat) {
      case "languages": return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "frameworks": return <Blocks className="w-5 h-5 text-emerald-400" />;
      case "databases": return <Database className="w-5 h-5 text-emerald-400" />;
      case "cloud": return <Terminal className="w-5 h-5 text-emerald-400" />;
      case "ai": return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 150, damping: 15 },
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
            {skillsData[activeCategory].map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-800/80 hover:border-emerald-500/20 transition-all duration-300 overflow-hidden">
                  <div className="relative z-10 flex items-center gap-4">
                    {/* Logo */}
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 group-hover:border-emerald-500/10 transition-colors flex-shrink-0">
                      <SkillIcon slug={skill.slug} fallback={getCategoryIcon(activeCategory)} />
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
