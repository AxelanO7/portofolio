"use client";

import React from "react";
import { m as motion } from "framer-motion";
import { Mail, MessageSquare, ArrowUpRight, Phone, Send } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ContactSection() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-emerald-400" />,
      title: "Email",
      description: "jeremia123.jm@gmail.com",
      link: "mailto:jeremia123.jm@gmail.com",
    },
    {
      icon: <LinkedinIcon className="w-6 h-6 text-emerald-400" />,
      title: "LinkedIn",
      description: "Connect professionally",
      link: "https://linkedin.com/in/jeremia-axelano",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: "WhatsApp",
      description: "+62 822 4603 4453",
      link: "https://wa.me/6282246034453",
    },
    {
      icon: <GithubIcon className="w-6 h-6 text-emerald-400" />,
      title: "GitHub",
      description: "Explore my source code",
      link: "https://github.com/AxelanO7",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
      id="contact"
      className="relative w-full py-24 overflow-hidden bg-slate-950 border-t border-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-slate-900/[0.05] rounded-full blur-3xl" />
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
            Let's <span className="text-emerald-400">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Currently building Guestlist Ecosystem as CTO. Open for strategic discussions, architecture consulting, and scalability conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 items-stretch">
          {/* Left: Contact Methods (Bento Grid tiles) */}
          <motion.div
            className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group relative flex flex-col justify-between p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-emerald-500/20 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ y: -3 }}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-emerald-500/10 transition-colors">
                    {method.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider">{method.title}</h3>
                  <p className="text-white font-bold text-base mt-1 truncate">{method.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Premium CTA Card */}
          <motion.div
            className="md:col-span-2 flex flex-col justify-between p-8 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Visual glow overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                  <span className="animate-ping absolute inline-flex h-[150%] w-[150%] rounded-full bg-emerald-400 opacity-20" style={{ animationDelay: "0.4s" }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active Channels
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Start a conversation
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Feel free to reach out via email for structured inquiries, or send a WhatsApp message for quick, direct updates.
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <a
                href="mailto:jeremia123.jm@gmail.com"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/5 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm"
              >
                <Send className="w-4 h-4" />
                Send structured email
              </a>
              <a
                href="https://wa.me/6282246034453"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-300 font-semibold rounded-xl transition-all text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Direct WhatsApp chat
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
