import HeroSection from "./sections/hero";
import FlagshipSection from "./sections/flagship";
import AgentsSection from "./sections/agents";
import MobileSection from "./sections/mobile";
import Web3Section from "./sections/web3";
import ClientsSection from "./sections/clients";
import ArsenalSection from "./sections/arsenal";
import ExperienceSection from "./sections/experience";
import ContactSection from "./sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FlagshipSection />
      <AgentsSection />
      <MobileSection />
      <Web3Section />
      <ClientsSection />
      <ArsenalSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
