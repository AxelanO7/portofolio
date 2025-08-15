import React, { useState } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";

// Import all project images
import imgSiapenku from "@/public/siapenku.png";
import imgSigapura from "@/public/sigapura.png";
import imgKoi from "@/public/koi.png";
import imgTeacherPayroll from "@/public/teacher_payroll.png";
import imgColorLearning from "@/public/color_learning.png";
import imgCalculator from "@/public/calculator.png";
import imgAssyarif from "@/public/assyarif.png";
import imgBnShop from "@/public/bn_shop.png";
import imgVillaManis from "@/public/villa_manis.png";
import imgSmartBtw from "@/public/smartbtw.png";
import imgBtwEdutech from "@/public/btwedutech.png";
import imgJobseerApp from "@/public/jobseeker_app.png";
import imgJobseerPartners from "@/public/jobseeker_partners.png";
import imgSujana from "@/public/sujana.png";
import imgVMUC from "@/public/vmuc.png";

export default function ProjectSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = [
    {
      id: "all",
      name: "All Projects",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "web",
      name: "Web Apps",
      icon: "💻",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "mobile",
      name: "Mobile Apps",
      icon: "📱",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "ai",
      name: "AI/ML",
      icon: "🤖",
      color: "from-orange-500 to-red-500",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Siapenku",
      category: "web",
      shortDescription: "Administrative Data Management System",
      description:
        "Comprehensive system for managing population data and administrative letters in Bulian Village, enhancing governance and service delivery.",
      image: imgSiapenku,
      techStack: ["Laravel", "Vue.js", "MySQL"],
      link: "http://siapenku.stion.site",
      featured: true,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "KOI Campus Platform",
      category: "web",
      shortDescription: "Campus Community Management",
      description:
        "Platform optimizing interactions among students, organizations, and activities within campus community with categorized event management.",
      image: imgKoi,
      techStack: ["React", "Go", "PostgreSQL"],
      link: "https://github.com/AxelanO7/koi-frontend-web-js",
      featured: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Smart BTW",
      category: "mobile",
      shortDescription: "Job Preparation Simulator",
      description:
        "Mobile application providing realistic simulation experience for job tryouts with interactive exercises and assessments.",
      image: imgSmartBtw,
      techStack: ["Flutter", "Firebase"],
      link: "",
      featured: true,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: 4,
      name: "Jobseeker App",
      category: "mobile",
      shortDescription: "Social Job Search Platform",
      description:
        "Revolutionary job search app with social media-like interface, skill-based matching, and instant job opportunities.",
      image: imgJobseerApp,
      techStack: ["Flutter", "Node.js", "MongoDB"],
      link: "https://play.google.com/store/apps/details?id=com.jobseeker.app&hl=id",
      featured: true,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "Sigapura 3D",
      category: "web",
      shortDescription: "3D Temple Digitization",
      description:
        "Innovative platform for digitizing temple shrines with advanced 3D modeling and immersive virtual exploration.",
      image: imgSigapura,
      techStack: ["PHP", "Three.js", "WebGL"],
      link: "https://github.com/AxelanO7/sigapura-web-php",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      name: "BN Shop Inventory",
      category: "web",
      shortDescription: "Smart Inventory Management",
      description:
        "Comprehensive inventory management system with real-time tracking, automated reordering, and analytics dashboard.",
      image: imgBnShop,
      techStack: ["React", "Go", "Redis"],
      link: "https://github.com/AxelanO7/bn-shop-frontend-web-js",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 7,
      name: "Villa Manis FinTech",
      category: "web",
      shortDescription: "Financial Management System",
      description:
        "Advanced financial reporting and accounting system for hospitality industry with real-time analytics.",
      image: imgVillaManis,
      techStack: ["React", "Go", "PostgreSQL"],
      link: "https://github.com/AxelanO7/villa-manis-frontend-web-js",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: 8,
      name: "Teacher Payroll",
      category: "mobile",
      shortDescription: "HR Management Mobile App",
      description:
        "Complete HR solution for teachers with attendance tracking, leave management, and digital payroll system.",
      image: imgTeacherPayroll,
      techStack: ["Flutter", "Laravel", "MySQL"],
      link: "https://github.com/AxelanO7/payroll-mobile-flutter",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 9,
      name: "BTW Edutech",
      category: "mobile",
      shortDescription: "Educational Technology Platform",
      description:
        "Advanced educational platform for skill development and career preparation with AI-powered assessments.",
      image: imgBtwEdutech,
      techStack: ["Flutter", "AI/ML", "Firebase"],
      link: "",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      id: 10,
      name: "VMUC FinTech",
      category: "web",
      shortDescription: "Villa Financial Intelligence",
      description:
        "Sophisticated financial reporting system for Villa Munduk with automated transaction processing and analytics.",
      image: imgVMUC,
      techStack: ["React", "Go", "TimescaleDB"],
      link: "https://github.com/AxelanO7/vmuc-fintech-frontend-web-js",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      id: 11,
      name: "Sujana Travel",
      category: "web",
      shortDescription: "Travel Booking System",
      description:
        "Comprehensive booking system for Sujana Tour & Travel with integrated payment processing and itinerary management.",
      image: imgSujana,
      techStack: ["React", "Go", "Stripe API"],
      link: "https://github.com/AxelanO7/sujana-frontend-web-js",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: 12,
      name: "Color Learning",
      category: "mobile",
      shortDescription: "Interactive Color Education",
      description:
        "Engaging mobile application for color theory education with interactive games and visual learning tools.",
      image: imgColorLearning,
      techStack: ["Java", "Android SDK"],
      link: "https://github.com/AxelanO7/color-learning-mobile-java",
      gradient: "from-rainbow-500 to-pink-500",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const featuredProjects = projects.filter((project) => project.featured);

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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const ProjectCard = ({ project, index, isFeatured = false }) => (
    <motion.div
      variants={itemVariants}
      className={`group relative ${isFeatured ? "md:col-span-2" : ""}`}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredProject(project.id)}
      onHoverEnd={() => setHoveredProject(null)}
    >
      <Card className="h-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden group-hover:shadow-2xl">
        <CardBody className="p-0">
          {/* Image Container */}
          <div className="relative overflow-hidden h-48 md:h-56">
            <motion.div
              className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            <Image
              src={project.image}
              alt={project.name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              fill
            />

            {/* Overlay Content */}
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 bg-gradient-to-r ${project.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => !project.link && e.preventDefault()}
              >
                {project.link ? "View Project" : "Coming Soon"}
              </motion.a>
            </motion.div>

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                className="absolute top-4 right-4 z-30"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs font-bold rounded-full shadow-lg`}
                >
                  ⭐ Featured
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <motion.h3
                className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                style={{
                  backgroundImage:
                    hoveredProject === project.id
                      ? `linear-gradient(to right, var(--tw-gradient-stops))`
                      : "none",
                }}
                whileHover={{
                  backgroundImage: `linear-gradient(to right, ${
                    project.gradient.split(" ")[1]
                  }, ${project.gradient.split(" ")[3]})`,
                }}
              >
                {project.name}
              </motion.h3>

              <p className="text-gray-400 text-sm font-medium">
                {project.shortDescription}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(
                (
                  tech:
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | Promise<React.AwaitedReactNode>
                    | React.Key
                    | MotionValue<number>
                    | MotionValue<string>
                    | null
                    | undefined,
                  techIndex: number
                ) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20 hover:border-white/40 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );

  return (
    <section className="relative flex flex-col min-h-screen justify-center items-center projects py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-40 w-96 h-96 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-red-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 via-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h1>
          <motion.div
            className="w-48 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-6"
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
            Innovative solutions that showcase technical excellence and creative
            problem-solving
          </motion.p>
        </motion.div>

        {/* Category Filters */}
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
                  activeFilter === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-white/20`
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }
              `}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </span>

              {activeFilter === category.id && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  layoutId="activeProjectTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isFeatured={project.featured}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              number: `${projects.length}+`,
              label: "Projects Completed",
              color: "from-blue-500 to-cyan-500",
            },
            {
              number: "15+",
              label: "Technologies Used",
              color: "from-purple-500 to-pink-500",
            },
            {
              number: "100%",
              label: "Client Satisfaction",
              color: "from-emerald-500 to-teal-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="space-y-2"
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
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
