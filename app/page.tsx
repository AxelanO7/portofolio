import HeroSection from "./sections/hero";
import ArcSection from "./sections/arc";
import FlagshipGuestlist from "./sections/flagship-guestlist";
import FlagshipLerka from "./sections/flagship-lerka";
import FlagshipMobile from "./sections/flagship-mobile";
import SkillSection from "./sections/skills";
import ArchiveSection from "./sections/archive";
import ContactSection from "./sections/contact";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <ArcSection />
      <FlagshipGuestlist />
      <FlagshipLerka />
      <FlagshipMobile />
      <SkillSection />
      <ArchiveSection />
      <ContactSection />
    </div>
  );
}
