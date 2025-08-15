"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Define the shape of a single skill object
interface Skill {
  name: string;
  icon: ReactNode; // ReactNode allows for JSX elements or strings (emojis)
  color: string;
}

// Define the specific categories to be used as keys
type SkillCategory = "languages" | "frameworks" | "cloud" | "ai";

// Define the shape of the entire skills data object
interface SkillsData {
  languages: Skill[];
  frameworks: Skill[];
  cloud: Skill[];
  ai: Skill[];
}

// Define the props for the SkillCard component
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
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "frameworks",
      name: "Frameworks",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: "☁️",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "ai",
      name: "AI & Tools",
      icon: "🤖",
      color: "from-orange-500 to-red-500",
    },
  ];

  const skillsData: SkillsData = {
    languages: [
      {
        name: "JavaScript",
        icon: <JavaScriptIcon />,
        color: "from-yellow-400 to-orange-500",
      },
      {
        name: "TypeScript",
        icon: <TypeScriptIcon />,
        color: "from-blue-600 to-blue-800",
      },
      { name: "Go", icon: <GoIcon />, color: "from-cyan-400 to-blue-500" },
      {
        name: "Python",
        icon: <PythonIcon />,
        color: "from-green-400 to-blue-500",
      },
      { name: "Dart", icon: <DartIcon />, color: "from-blue-400 to-cyan-600" },
      {
        name: "Kotlin",
        icon: <KotlinIcon />,
        color: "from-purple-500 to-pink-500",
      },
      {
        name: "Swift",
        icon: <SwiftIcon />,
        color: "from-orange-500 to-red-500",
      },
      { name: "Java", icon: <JavaIcon />, color: "from-red-600 to-orange-600" },
      { name: "PHP", icon: <PhpIcon />, color: "from-purple-600 to-blue-600" },
      {
        name: "C++",
        icon: <CPlusPlusIcon />,
        color: "from-blue-700 to-purple-700",
      },
      {
        name: "C#",
        icon: <CSharpIcon />,
        color: "from-purple-600 to-pink-600",
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
        color: "from-gray-800 to-gray-600",
      },
      {
        name: "Vue.js",
        icon: <VueJsIcon />,
        color: "from-green-400 to-emerald-500",
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
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "Laravel",
        icon: <LaravelIcon />,
        color: "from-red-500 to-orange-500",
      },
      {
        name: "Flask",
        icon: <FlaskIcon />,
        color: "from-gray-700 to-gray-900",
      },
      { name: ".NET", icon: <NetIcon />, color: "from-purple-600 to-blue-600" },
      {
        name: "CodeIgniter",
        icon: <CodeIgniterIcon />,
        color: "from-orange-500 to-red-500",
      },
    ],
    cloud: [
      { name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-500" },
      { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500" },
      { name: "CI/CD", icon: "🔄", color: "from-green-500 to-emerald-500" },
      { name: "Linux", icon: "🐧", color: "from-gray-700 to-gray-900" },
      { name: "Kubernetes", icon: "⚙️", color: "from-blue-600 to-purple-600" },
      { name: "MongoDB", icon: "🍃", color: "from-green-600 to-emerald-600" },
      { name: "PostgreSQL", icon: "🐘", color: "from-blue-700 to-indigo-700" },
      { name: "MySQL", icon: "🗄️", color: "from-orange-500 to-red-500" },
    ],
    ai: [
      { name: "n8n", icon: "🔗", color: "from-pink-500 to-red-500" },
      { name: "Chatbot", icon: "🤖", color: "from-blue-500 to-purple-500" },
      {
        name: "Machine Learning",
        icon: "🧠",
        color: "from-purple-500 to-pink-500",
      },
      { name: "OpenAI API", icon: "⚡", color: "from-green-400 to-blue-500" },
      { name: "Git", icon: "📚", color: "from-orange-500 to-red-500" },
      { name: "ClickUp", icon: "📋", color: "from-purple-500 to-blue-500" },
      { name: "Automation", icon: "🔧", color: "from-cyan-500 to-blue-500" },
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const, // Fix: Add 'as const' to specify the literal type
        stiffness: 150,
        damping: 12,
      },
    },
  };

  const SkillCard = ({ skill, index }: SkillCardProps) => (
    <motion.div
      variants={itemVariants}
      className="group relative"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden">
        {/* Background glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
          initial={false}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {typeof skill.icon === "string" ? (
              <span className="text-4xl">{skill.icon}</span>
            ) : (
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
            )}
          </motion.div>

          {/* Skill name */}
          <h3 className="text-white font-semibold text-center mb-4 group-hover:text-white transition-colors">
            {skill.name}
          </h3>

          {/* Simple indicator without percentage */}
          <div className="flex justify-center">
            <motion.div
              className={`w-8 h-1 bg-gradient-to-r ${skill.color} rounded-full`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center skills py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 via-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Tech Arsenal
            </span>
          </motion.h1>
          <motion.div
            className="w-48 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Cutting-edge technologies I leverage to build innovative solutions
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`
                group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-white/20`
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }
              `}
              onClick={() => setActiveCategory(category.id as SkillCategory)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </span>

              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {skillsData[activeCategory].map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "25+",
                label: "Technologies Mastered",
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: "10+",
                label: "Frameworks Expertise",
                color: "from-purple-500 to-pink-500",
              },
              {
                number: "5+",
                label: "Years Experience",
                color: "from-emerald-500 to-teal-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 font-medium mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
