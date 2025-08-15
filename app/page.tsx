"use client";

import dynamic from "next/dynamic";

// Dynamic imports untuk semua section yang menggunakan motion
const MainSection = dynamic(() => import("./sections/main"), { ssr: false });
const AboutSection = dynamic(() => import("./sections/about"), { ssr: false });
const SkillSection = dynamic(() => import("./sections/skills"), { ssr: false });
const ProjectSection = dynamic(() => import("./sections/project"), {
  ssr: false,
});
const ContactSection = dynamic(() => import("./sections/contact"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full">
      <MainSection />
      <hr className="border-gray-700" />
      <AboutSection />
      <hr className="border-gray-700" />
      <SkillSection />
      <hr className="border-gray-700" />
      <ProjectSection />
      <hr className="border-gray-700" />
      <ContactSection />
    </div>
  );
}
