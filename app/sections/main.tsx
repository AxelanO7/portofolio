"use client";

import Image from "next/image";
import { ArrowDown, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { m as motion } from "framer-motion";

const journeyData = [
  {
    date: "Dec 2019",
    title: "Freelance Full-Stack",
    metric: "6+ Yrs Experience",
    desc: "Built scalable web/mobile platforms",
  },
  {
    date: "Aug 2021",
    title: "President BEM INSTIKI",
    metric: "Led 114 Members",
    desc: "Executed 40+ programs",
  },
  {
    date: "Aug 2022",
    title: "Mobile Lead @ BTW",
    metric: "BTW Edutech",
    desc: "Led mobile engineering team",
  },
  {
    date: "Sep 2024",
    title: "Sr Mobile Engineer",
    metric: "Jobseeker",
    desc: "Engineered SaaS matching platforms",
  },
  {
    date: "Mar 2025",
    title: "CTO @ NDS",
    metric: "4 Guestlist Platforms",
    desc: "Mobile, Web, Backend & Back-office ecosystems",
  },
];

export default function MainSection() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "resume.pdf";
    link.download = "Axel's Resume.pdf";
    link.click();
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center bg-slate-950 text-white pt-24 pb-16 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[140px] emerald-glow-bg" />
      </div>

      <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col justify-center space-y-16 relative z-10">
        {/* Profile and Headline */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16 pt-8">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Building Guestlist Ecosystem
            </motion.div>

            {/* Name with glow layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Glow behind name */}
              <div className="absolute -inset-4 rounded-3xl bg-emerald-500/[0.06] blur-2xl emerald-glow-bg pointer-events-none" />
              <h1 className="relative text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-white">
                Jeremia <br />
                <span className="text-emerald-400">Axelano</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed"
            >
              I build platforms.{" "}
              <span className="font-extrabold text-emerald-400">Then I scale them.</span>{" "}
              <br />
              <span className="text-slate-400 text-lg">
                Turning complex distributed systems into products people use.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Bali, Indonesia</span>
              </div>
              <span className="hidden md:inline text-slate-700">|</span>
              <div>CTO @ New Directions Success</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
            >
              <button
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={handleDownload}
              >
                Download CV / Resume
              </button>
              <a
                href="#projects"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-medium rounded-xl transition-all"
              >
                View Selected Work
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 flex-shrink-0 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
          >
            <Image
              src="/a.png"
              alt="Jeremia Axelano Mowisu"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 192px, 256px"
              priority
            />
          </motion.div>
        </div>

        {/* Trajectory Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6 pt-8"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xs uppercase font-mono tracking-widest text-slate-400">
              Trajectory Timeline
            </h2>
          </div>
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[-12px] left-0 right-0 h-0.5 bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500/40 timeline-line-animate" />
            </div>
            {/* Mobile connecting line */}
            <div className="md:hidden absolute left-[-13px] top-0 bottom-0 w-0.5 bg-slate-800 overflow-hidden">
              <div className="w-full bg-emerald-500/40 h-full timeline-line-animate" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-l-2 md:border-l-0 md:border-t-2 border-slate-800 pl-4 md:pl-0 md:pt-6">
              {journeyData.map((node, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[25px] top-1 md:-top-[31px] md:left-0 w-4 h-4 rounded-full border-2 border-slate-700 bg-slate-950 group-hover:border-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300" />
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-emerald-400 font-semibold">
                      {node.date}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {node.title}
                    </h4>
                    <div className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded-md mt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span>{node.metric}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal mt-1">{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <div className="pt-12 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div className="animate-bounce">
          <ArrowDown className="w-5 h-5 text-emerald-500/60" />
        </div>
      </div>
    </section>
  );
}
