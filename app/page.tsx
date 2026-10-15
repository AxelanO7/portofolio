import HeroSection from "./sections/hero";
import Ribbon from "./sections/ribbon";
import TrailerSection from "./sections/trailer";
import PlatformSection from "./sections/platform";
import SystemSection from "./sections/system";
import LiveSection from "./sections/live";
import CasesSection from "./sections/cases";
import AtlasSection from "./sections/atlas";
import AgentsSection from "./sections/agents";
import WallSection from "./sections/wall";
import BuildsSection from "./sections/builds";
import TerminalSection from "./sections/terminal";
import AboutSection from "./sections/about";
import ArsenalSection from "./sections/arsenal";
import ContactSection from "./sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Ribbon />
      <TrailerSection />
      <PlatformSection />
      <SystemSection />
      <LiveSection />
      <CasesSection />
      <AtlasSection />
      <AgentsSection />
      <WallSection />
      <BuildsSection />
      <TerminalSection />
      <AboutSection />
      <ArsenalSection />
      <ContactSection />
    </>
  );
}
