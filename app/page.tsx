import MainSection from "./sections/main";
import AboutSection from "./sections/about";
import SkillSection from "./sections/skills";
import ProjectSection from "./sections/project";
import ContactSection from "./sections/contact";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <MainSection />
      <AboutSection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
}
