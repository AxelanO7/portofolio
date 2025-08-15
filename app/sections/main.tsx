"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MainSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const roles = [
    "CTO & Tech Leader",
    "Full Stack Engineer",
    "DevOps Specialist",
    "AI Innovation Expert",
    "System Architect",
    "Mobile Engineer",
  ];

  const roleColors = [
    "from-purple-600 via-pink-600 to-red-500",
    "from-blue-600 via-cyan-500 to-teal-500",
    "from-green-500 via-emerald-500 to-teal-600",
    "from-orange-500 via-amber-500 to-yellow-500",
    "from-indigo-600 via-purple-600 to-pink-500",
    "from-red-500 via-rose-500 to-pink-600",
  ];

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "resume.pdf";
    link.download = "Axel's Resume.pdf";
    link.click();
  };

  const handleSocialMedia = (url: string) => {
    window.open(url, "_blank");
  };

  // Floating particles animation (Static version)
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full animate-pulse ${
            i % 4 === 0
              ? "bg-blue-400"
              : i % 4 === 1
                ? "bg-purple-400"
                : i % 4 === 2
                  ? "bg-pink-400"
                  : "bg-cyan-400"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  // Gradient background orbs (Static version)
  const GradientOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 via-teal-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center space-y-8 overflow-hidden">
      <FloatingParticles />
      <GradientOrbs />

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="relative w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden hover:shadow-blue-500/30 transition-all duration-300">
              <Image
                src="/a.png"
                alt="Jeremia Axelano"
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>

            {/* Static orbiting elements */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full animate-pulse ${
                  i % 3 === 0
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : i % 3 === 1
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500"
                }`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translate(${Math.cos((i * 60 * Math.PI) / 180) * 80}px, ${Math.sin((i * 60 * Math.PI) / 180) * 80}px)`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-4xl font-bold flex flex-col sm:flex-row justify-center items-center sm:justify-center text-white sm:text-6xl sm:leading-relaxed gap-4 opacity-0 animate-[fadeInUp_1s_0.5s_ease-out_forwards]">
          <span className="text-white">Hi, I'm</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Axel
          </span>
          <span className="text-4xl sm:text-6xl animate-bounce">👋</span>
        </h1>

        {/* Dynamic role display */}
        <div className="text-xl font-semibold text-white sm:text-2xl sm:leading-relaxed flex items-center justify-center space-x-2 h-16 opacity-0 animate-[fadeInUp_1s_0.8s_ease-out_forwards]">
          <span className="text-cyan-400 animate-pulse">|</span>
          <span
            className={`bg-gradient-to-r ${roleColors[currentRole]} bg-clip-text text-transparent font-bold transition-all duration-500`}
          >
            {roles[currentRole]}
          </span>
          <span className="text-cyan-400 animate-pulse">|</span>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-gray-200 sm:text-lg text-center leading-relaxed opacity-0 animate-[fadeInUp_1s_1s_ease-out_forwards]">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
            CTO & Tech Leader
          </span>{" "}
          passionate about building{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            innovative solutions
          </span>{" "}
          with{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-semibold">
            AI-powered technology
          </span>
          . Leading teams to transform ideas into scalable digital realities.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 opacity-0 animate-[fadeInUp_1s_1.2s_ease-out_forwards]">
          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            onClick={handleDownload}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Download CV</span>
          </button>

          {/* Social media icons */}
          <div className="flex gap-4">
            {[
              {
                url: "https://linkedin.com/in/jeremia-axelano",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="w-6 h-6 fill-current"
                  >
                    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                  </svg>
                ),
                gradient: "from-blue-600 to-blue-800",
              },
              {
                url: "https://github.com/AxelanO7",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="w-6 h-6 fill-current"
                  >
                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                  </svg>
                ),
                gradient: "from-gray-700 to-gray-900",
              },
            ].map((social, index) => (
              <button
                key={index}
                className={`group relative p-4 bg-gradient-to-r ${social.gradient} text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-110 hover:rotate-3`}
                onClick={() => handleSocialMedia(social.url)}
              >
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <div className="relative z-10">{social.icon}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-[fadeInUp_1s_2s_ease-out_forwards]">
          <div className="text-gray-400 animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
