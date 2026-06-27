"use client";

import React, { useState, ReactNode } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Code2, Cpu, Database, Blocks } from "lucide-react";
import {
  AngularIcon,
  CodeIgniterIcon,
  NodeJsIcon,
  FlaskIcon,
  FlutterIcon,
  LaravelIcon,
  NetIcon,
  NextJsIcon,
  ReactJsIcon,
  VueJsIcon,
} from "@/components/icons/programming/frameworks";
import {
  CPlusPlusIcon,
  CSharpIcon,
  DartIcon,
  GoIcon,
  JavaIcon,
  JavaScriptIcon,
  KotlinIcon,
  PhpIcon,
  PythonIcon,
  SwiftIcon,
  TypeScriptIcon,
} from "@/components/icons/programming/languages";

interface Skill {
  name: string;
  icon: ReactNode;
  color: string;
}

type SkillCategory = "languages" | "frameworks" | "cloud" | "ai";

interface SkillsData {
  languages: Skill[];
  frameworks: Skill[];
  cloud: Skill[];
  ai: Skill[];
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillSection() {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("languages");

  const categories = [
    {
      id: "languages",
      name: "Languages",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: "frameworks",
      name: "Frameworks",
      icon: <Blocks className="w-4 h-4" />,
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "ai",
      name: "AI & Tools",
      icon: <Cpu className="w-4 h-4" />,
    },
  ];

  const skillsData: SkillsData = {
    languages: [
      {
        name: "JavaScript",
        icon: <JavaScriptIcon />,
        color: "from-amber-400 to-yellow-500",
      },
      {
        name: "TypeScript",
        icon: <TypeScriptIcon />,
        color: "from-blue-500 to-indigo-600",
      },
      { name: "Go", icon: <GoIcon />, color: "from-cyan-400 to-blue-500" },
      {
        name: "Python",
        icon: <PythonIcon />,
        color: "from-emerald-400 to-emerald-600",
      },
      { name: "Dart", icon: <DartIcon />, color: "from-blue-400 to-cyan-500" },
      {
        name: "Kotlin",
        icon: <KotlinIcon />,
        color: "from-purple-500 to-indigo-500",
      },
      {
        name: "Swift",
        icon: <SwiftIcon />,
        color: "from-orange-500 to-red-500",
      },
      { name: "Java", icon: <JavaIcon />, color: "from-red-600 to-orange-600" },
      { name: "PHP", icon: <PhpIcon />, color: "from-indigo-600 to-blue-600" },
      {
        name: "C++",
        icon: <CPlusPlusIcon />,
        color: "from-blue-600 to-purple-600",
      },
      {
        name: "C#",
        icon: <CSharpIcon />,
        color: "from-purple-600 to-indigo-600",
      },
    ],
    frameworks: [
      {
        name: "React.js",
        icon: <ReactJsIcon />,
        color: "from-cyan-400 to-blue-500",
      },
      {
        name: "Next.js",
        icon: <NextJsIcon />,
        color: "from-slate-700 to-slate-500",
      },
      {
        name: "Vue.js",
        icon: <VueJsIcon />,
        color: "from-emerald-400 to-emerald-600",
      },
      {
        name: "Angular",
        icon: <AngularIcon />,
        color: "from-red-500 to-pink-500",
      },
      {
        name: "Flutter",
        icon: <FlutterIcon />,
        color: "from-blue-400 to-cyan-500",
      },
      {
        name: "Node.js",
        icon: <NodeJsIcon />,
        color: "from-emerald-500 to-emerald-600",
      },
      {
        name: "Laravel",
        icon: <LaravelIcon />,
        color: "from-red-500 to-orange-500",
      },
      {
        name: "Flask",
        icon: <FlaskIcon />,
        color: "from-slate-700 to-slate-900",
      },
      { name: ".NET", icon: <NetIcon />, color: "from-indigo-600 to-purple-600" },
      {
        name: "CodeIgniter",
        icon: <CodeIgniterIcon />,
        color: "from-orange-500 to-red-500",
      },
    ],
    cloud: [
      { name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-500" },
      { name: "AWS", icon: "☁️", color: "from-amber-400 to-yellow-500" },
      { name: "CI/CD", icon: "🔄", color: "from-emerald-500 to-teal-500" },
      { name: "Linux", icon: "🐧", color: "from-slate-700 to-slate-900" },
      { name: "Kubernetes", icon: "⚙️", color: "from-blue-500 to-indigo-600" },
      { name: "MongoDB", icon: "🍃", color: "from-emerald-600 to-teal-600" },
      { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-700" },
      { name: "MySQL", icon: "🗄️", color: "from-amber-500 to-orange-600" },
    ],
    ai: [
      { name: "n8n", icon: "🔗", color: "from-red-500 to-pink-500" },
      { name: "Chatbot", icon: "🤖", color: "from-blue-500 to-indigo-500" },
      {
        name: "Machine Learning",
        icon: "🧠",
        color: "from-purple-500 to-pink-500",
      },
      { name: "OpenAI API", icon: "⚡", color: "from-emerald-400 to-cyan-500" },
      { name: "Git", icon: "📚", color: "from-orange-500 to-red-500" },
      { name: "ClickUp", icon: "📋", color: "from-purple-500 to-indigo-500" },
      { name: "Automation", icon: "🔧", color: "from-cyan-400 to-blue-500" },
      {
        name: "API Integration",
        icon: "🔌",
        color: "from-emerald-500 to-teal-500",
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 15,
      },
    },
  };

  const SkillCard = ({ skill, index }: SkillCardProps) => (
    <motion.div
      variants={itemVariants}
      className="group relative"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/20 transition-all duration-300 overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 group-hover:border-emerald-500/10 transition-colors">
            {typeof skill.icon === "string" ? (
              <span className="text-2xl">{skill.icon}</span>
            ) : (
              <div className="w-7 h-7 transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                {skill.icon}
              </div>
            )}
          </div>

          {/* Skill name */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide">
              {skill.name}
            </h4>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Expertise</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      className="relative w-full py-20 overflow-hidden bg-slate-950 border-t border-slate-900"
    >
      {/* Background Elements */}
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
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
