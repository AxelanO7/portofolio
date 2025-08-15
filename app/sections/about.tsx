import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const achievements = [
    {
      icon: "🚀",
      title: "Tech Leadership",
      description:
        "Leading cross-functional teams in building scalable solutions",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🎯",
      title: "Strategic Innovation",
      description:
        "Driving digital transformation with AI-powered technologies",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "⚡",
      title: "DevOps Excellence",
      description: "Architecting robust infrastructure and CI/CD pipelines",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Implementing cutting-edge AI solutions for business growth",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center about py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 via-teal-400/10 to-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h1>
          <motion.div
            className="w-48 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
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
              <h2 className="text-2xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  CTO & Technology Leader
                </span>
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                Experienced{" "}
                <span className="text-purple-400 font-semibold">
                  Chief Technology Officer
                </span>{" "}
                with a proven track record in leading digital transformation
                initiatives and building high-performing engineering teams.
                Specialized in
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  full-stack development
                </span>
                ,
                <span className="text-emerald-400 font-semibold">
                  {" "}
                  DevOps engineering
                </span>
                , and
                <span className="text-orange-400 font-semibold">
                  {" "}
                  AI integration
                </span>
                .
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gray-200 leading-relaxed">
                My expertise spans across multiple domains including{" "}
                <span className="text-blue-400 font-semibold">
                  mobile and web application development
                </span>
                , leveraging cutting-edge technologies like{" "}
                <span className="text-purple-400 font-semibold">
                  React, Vue.js, Flutter, Node.js, Go, Python
                </span>
                , and modern{" "}
                <span className="text-emerald-400 font-semibold">
                  cloud infrastructure
                </span>{" "}
                with{" "}
                <span className="text-cyan-400 font-semibold">
                  Docker, AWS, and advanced CI/CD pipelines
                </span>
                .
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gray-200 leading-relaxed">
                As a strategic leader, I focus on{" "}
                <span className="text-pink-400 font-semibold">
                  driving innovation
                </span>{" "}
                through
                <span className="text-orange-400 font-semibold">
                  {" "}
                  AI-powered solutions
                </span>
                , implementing
                <span className="text-teal-400 font-semibold">
                  {" "}
                  scalable architectures
                </span>
                , and fostering a culture of
                <span className="text-purple-400 font-semibold">
                  {" "}
                  continuous improvement
                </span>{" "}
                within development teams. Passionate about transforming complex
                business challenges into elegant, efficient, and future-proof
                technological solutions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Frontend", color: "from-blue-500 to-cyan-500" },
                  { label: "Backend", color: "from-green-500 to-emerald-500" },
                  { label: "Fullstack", color: "from-purple-500 to-pink-500" },
                  { label: "Leadership", color: "from-orange-500 to-red-500" },
                  {
                    label: "Innovation",
                    color: "from-indigo-500 to-purple-500",
                  },
                  { label: "AI/ML", color: "from-cyan-500 to-teal-500" },
                  { label: "DevOps", color: "from-emerald-500 to-blue-500" },
                  { label: "Architecture", color: "from-pink-500 to-rose-500" },
                  { label: "Mentoring", color: "from-amber-500 to-orange-500" },
                ].map((skill, index) => (
                  <motion.span
                    key={skill.label}
                    className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${skill.color} text-white shadow-lg`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Achievement Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className={`
                  relative p-6 bg-gradient-to-br ${achievement.gradient} rounded-2xl 
                  shadow-xl hover:shadow-2xl transition-all duration-300
                  border border-white/20 backdrop-blur-sm
                  overflow-hidden
                `}
                >
                  {/* Background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {achievement.icon}
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {achievement.title}
                    </h3>

                    <p className="text-white/90 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/30"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            {
              number: "5+",
              label: "Years Experience",
              color: "from-blue-500 to-cyan-500",
            },
            {
              number: "50+",
              label: "Projects Delivered",
              color: "from-purple-500 to-pink-500",
            },
            {
              number: "20+",
              label: "Technologies",
              color: "from-emerald-500 to-teal-500",
            },
            {
              number: "10+",
              label: "Team Members Led",
              color: "from-orange-500 to-red-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.1,
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-300 font-medium mt-2">{stat.label}</div>
              <motion.div
                className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mx-auto mt-2 group-hover:w-full transition-all duration-300`}
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.blockquote
            className="text-xl md:text-2xl font-medium text-gray-200 italic max-w-4xl mx-auto"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            "Innovation distinguishes between a leader and a follower. I believe
            in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              transforming challenges into opportunities
            </span>{" "}
            through technology."
          </motion.blockquote>
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
