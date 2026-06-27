"use client";

import Image from "next/image";
import { ArrowDown, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center bg-slate-950 text-white pt-24 pb-16 px-6">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/[0.03] blur-[140px]" />
      </div>

      <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col justify-center space-y-16 relative z-10">
        {/* Profile and Headline */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16 pt-8">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Building Guestlist Ecosystem
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-white">
              Jeremia <br />
              <span className="text-emerald-400">Axelano</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
              I build platforms. <span className="font-extrabold text-emerald-400">Then I scale them.</span> <br />
              <span className="text-slate-400 text-lg">Turning complex distributed systems into products people use.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Bali, Indonesia</span>
              </div>
              <span className="hidden md:inline text-slate-700">|</span>
              <div>CTO @ New Directions Success</div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={handleDownload}
              >
                Download CV / Resume
              </button>
              <a
                href="#projects"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-750 text-white font-medium rounded-xl transition-all"
              >
                View Selected Work
              </a>
            </div>
          </div>

          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 flex-shrink-0">
            <Image
              src="/a.png"
              alt="Jeremia Axelano Mowisu"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 192px, 256px"
              priority
            />
          </div>
        </div>

        {/* Mini Journey Horizontal Timeline */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xs uppercase font-mono tracking-widest text-slate-400">Trajectory Timeline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-l-2 md:border-l-0 md:border-t-2 border-slate-800 pl-4 md:pl-0 md:pt-6 relative">
            {journeyData.map((node, i) => (
              <div key={i} className="relative group">
                {/* Node point marker */}
                <div className="absolute -left-[25px] top-1 md:-top-[31px] md:left-0 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-950 group-hover:border-emerald-500 transition-colors duration-300" />
                
                <div className="space-y-1">
                  <div className="text-xs font-mono text-emerald-400 font-semibold">{node.date}</div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{node.title}</h4>
                  <div className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded-md mt-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{node.metric}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal mt-1">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="pt-12 text-slate-500 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
}
