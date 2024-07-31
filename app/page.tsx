import AboutSection from "./sections/about";
import ContactSection from "./sections/contact";
import MainSection from "./sections/main";
import ProjectSection from "./sections/project";
import SkillSection from "./sections/skills";

export default function Home() {
  return (
    <>
      <MainSection />
      <hr />
      <AboutSection />
      <hr />
      <SkillSection />
      <hr />
      <ProjectSection />
      <hr />
      <ContactSection />
    </>
  );
}
