"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Target, Zap, Bot } from "lucide-react";

export default function AboutSection() {
  const achievements = [
    {
      icon: <Rocket className="w-8 h-8 text-emerald-400" />,
      title: "Tech Leadership",
      description:
        "Leading cross-functional teams in building scalable solutions",
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-400" />,
      title: "Strategic Innovation",
      description:
        "Driving digital transformation with AI-powered technologies",
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      title: "DevOps Excellence",
      description: "Architecting robust infrastructure and CI/CD pipelines",
    },
    {
      icon: <Bot className="w-8 h-8 text-emerald-400" />,
      title: "AI Integration",
      description: "Implementing cutting-edge AI solutions for business growth",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-20 overflow-hidden bg-slate-950"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-600/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tight text-white">
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto" />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Builder & Technology Architect
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                Proven experience as a{" "}
                <span className="text-emerald-400 font-semibold">
                  Chief Technology Officer
                </span>{" "}
                with a track record in leading teams, designing resilient architectures, and building production platforms.
                Specialized in
                <span className="text-white font-semibold"> full-stack systems</span>
                ,
                <span className="text-white font-semibold"> mobile development</span>
                , and
                <span className="text-white font-semibold"> distributed infrastructure</span>.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-slate-400 leading-relaxed font-light">
                My execution strategy leverages modern tools including{" "}
                <span className="text-emerald-400 font-medium">React, Next.js, Vue, Flutter, Go, and Python</span>. I place heavy focus on containerized deployments, cloud native environments (AWS, GCP, VPS), and robust automation.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-slate-400 leading-relaxed font-light text-sm border-l-2 border-emerald-500/30 pl-4 py-1">
                Currently building the Guestlist Ecosystem — a marketplace for entertainment, lifestyle, and premium experiences across Bali and Indonesia.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Frontend",
                  "Backend",
                  "Mobile Apps",
                  "Infrastructure",
                  "Architecture",
                  "DevOps",
                  "CI/CD",
                  "Scaling Systems",
                  "Team Leadership",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Achievement Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className="relative p-6 bg-slate-900/50 rounded-2xl border border-slate-800 group-hover:border-emerald-500/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="relative z-10 space-y-4">
                    <div className="p-3 bg-emerald-500/5 w-fit rounded-2xl border border-emerald-500/10">
                      {achievement.icon}
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      {achievement.title}
                    </h4>

                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            {
              number: "6+",
              label: "Years Experience",
            },
            {
              number: "50+",
              label: "Products Delivered",
            },
            {
              number: "20+",
              label: "Stack Technologies",
            },
            {
              number: "114",
              label: "Organization Members Led",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-emerald-400">
                {stat.number}
              </div>
              <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
