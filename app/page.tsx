import AboutSection from "./sections/about";
import ContactSection from "./sections/contact";
import MainSection from "./sections/main";
import ProjectSection from "./sections/project";
import SkillSection from "./sections/skills";

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
