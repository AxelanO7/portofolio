import type { StaticImageData } from "next/image";

import imgSiapenku from "@/public/siapenku.png";
import imgKoi from "@/public/koi.png";
import imgSmartBtw from "@/public/smartbtw.png";
import imgJobseekerApp from "@/public/jobseeker_app.png";
import imgJobseekerPartners from "@/public/jobseeker_partners.png";
import imgBtwEdutech from "@/public/btwedutech.png";
import imgVillaManis from "@/public/villa_manis.png";
import imgBnShop from "@/public/bn_shop.png";
import imgTeacherPayroll from "@/public/teacher_payroll.png";
import imgSujana from "@/public/sujana.png";
import imgGlPulse from "@/public/gl-pulse.png";
import imgCatTheBuilder from "@/public/ext-cat-the-builder-coin.png";
import imgLuluCoin from "@/public/ext-lulu-coin.png";
import imgUtanCoin from "@/public/ext-lp-utan.png";
import imgBrainlessCoin from "@/public/ext-brainless-coin.png";
import imgGenzTerminal from "@/public/ext-genz-terminal.png";
import imgYellowKid from "@/public/ext-yellow-kid.png";
import imgWeda from "@/public/ext-weda.png";
import imgCrochet from "@/public/ext-crochet-catalog.png";
import imgNusafish from "@/public/ext-nusafish.png";
import imgMarrintisLink from "@/public/ext-marrintis-link.png";
import imgMarrintisLp from "@/public/ext-marrintis-lp.png";
import imgLpTax from "@/public/ext-lp-tax.png";
import imgExzetLink from "@/public/ext-exzet-link.png";
import imgCaturnCoin from "@/public/ext-caturn-coin.png";
import imgMiaoverseCoin from "@/public/ext-miaoverse-coin.png";
import imgGuochaoCoin from "@/public/ext-guochao-coin.png";
import imgComicCoin from "@/public/ext-comic-coin.png";
import imgAcademyCoin from "@/public/ext-academy-coin.png";
import imgLyani from "@/public/ext-lyani.png";
import imgBabyPuddle from "@/public/ext-baby-puddle.png";
import imgMingzyCoin from "@/public/ext-mingzy-coin.png";
import imgDyFashionStuff from "@/public/ext-dyfashionstuff.png";
import imgErp from "@/public/ext-erp.png";
import imgMingzyDemo from "@/public/ext-mingzy-demo.png";
import imgLpBet from "@/public/ext-lp-bet.png";

export type Tier = "archive" | "web3";

export interface ProjectItem {
  id: number;
  name: string;
  role: string;
  description: string;
  image: StaticImageData | null;
  techStack: string[];
  link?: string;
  tag: string;
  tier: Tier;
}

/**
 * "Selected work" archive — everything NOT already told as a dedicated
 * flagship case study (Guestlist ecosystem, Lerka, Mobile leadership each
 * have their own narrative section). Web3 meme-coin landing pages are
 * grouped under tier "web3" so volume shows without diluting credibility.
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: 10,
    name: "IT Pulse — Internal Support System",
    role: "CTO & Lead Architect",
    description: "Internal IT support system for ticket management, scheduling, attendance tracking, and Discord integration.",
    image: imgGlPulse,
    techStack: ["Next.js", "TypeScript", "Discord API"],
    link: "https://pulse.guestlist.id",
    tag: "Internal",
    tier: "archive",
  },
  {
    id: 12,
    name: "Jobseeker App",
    role: "Senior Mobile Engineer",
    description: "Social-first job search platform with skill-based matching and instant opportunities. Published on Google Play.",
    image: imgJobseekerApp,
    techStack: ["Flutter", "Node.js", "MongoDB"],
    link: "https://play.google.com/store/apps/details?id=com.jobseeker.app&hl=id",
    tag: "Mobile",
    tier: "archive",
  },
  {
    id: 13,
    name: "Jobseeker Partners",
    role: "Senior Mobile Engineer",
    description: "Partner app for businesses to post jobs and manage applicants with fast matching and skill filters.",
    image: imgJobseekerPartners,
    techStack: ["Flutter"],
    link: "https://play.google.com/store/apps/details?id=com.jobseeker.partners&hl=id",
    tag: "Mobile",
    tier: "archive",
  },
  {
    id: 14,
    name: "Smart BTW",
    role: "Mobile Engineering Lead",
    description: "Job preparation simulator with realistic tryout simulations, interactive exercises, and performance analytics.",
    image: imgSmartBtw,
    techStack: ["Flutter", "Firebase"],
    tag: "Mobile",
    tier: "archive",
  },
  {
    id: 15,
    name: "BTW Edutech Platform",
    role: "Mobile Engineering Lead",
    description: "Full educational platform for skill development and career preparation across iOS, Android, and Web.",
    image: imgBtwEdutech,
    techStack: ["Flutter", "React", "Firebase"],
    tag: "Platform",
    tier: "archive",
  },
  {
    id: 16,
    name: "KOI Campus Platform",
    role: "Full-Stack Engineer",
    description: "Campus community platform optimizing student–organization interactions with event management and activity tracking.",
    image: imgKoi,
    techStack: ["React", "Go", "PostgreSQL"],
    link: "https://github.com/AxelanO7/koi-frontend-web-js",
    tag: "Web",
    tier: "archive",
  },
  { id: 22, name: "Cat The Builder", role: "Freelance Web Developer", description: "Meme coin landing page with playful brand identity, live token stats, and community links.", image: imgCatTheBuilder, techStack: ["Next.js", "Tailwind", "Framer Motion"], link: "https://catthebuilder.axelano.space", tag: "Web3", tier: "web3" },
  { id: 23, name: "Lulu Coin", role: "Freelance Web Developer", description: "Meme coin landing page featuring token stats, roadmap, and buy flow for the Lulu community.", image: imgLuluCoin, techStack: ["Next.js", "Tailwind"], link: "https://lulu.axelano.space", tag: "Web3", tier: "web3" },
  { id: 24, name: "Utan Coin", role: "Freelance Web Developer", description: "Meme coin landing page with tokenomics, roadmap, and contract address sections.", image: imgUtanCoin, techStack: ["Next.js", "Tailwind"], link: "https://utan.axelano.space", tag: "Web3", tier: "web3" },
  { id: 25, name: "Brainless Coin", role: "Freelance Web Developer", description: "Meme coin landing page with bold brand identity and live activity feed.", image: imgBrainlessCoin, techStack: ["Next.js", "Tailwind"], link: "https://brainless.axelano.space", tag: "Web3", tier: "web3" },
  { id: 26, name: "Alpha Terminal", role: "Freelance Web Developer", description: "Terminal-themed meme coin landing page with live stats dashboard styling.", image: imgGenzTerminal, techStack: ["Next.js", "Tailwind"], link: "https://genz.axelano.space", tag: "Web3", tier: "web3" },
  { id: 27, name: "Yellow Kid Coin", role: "Freelance Web Developer", description: "Meme coin landing page with custom mascot branding and community links.", image: imgYellowKid, techStack: ["Next.js", "Tailwind"], link: "https://yellowkid.axelano.space", tag: "Web3", tier: "web3" },
  { id: 28, name: "Weda Bali Top Tours", role: "Freelance Web Developer", description: "Tour & travel marketing site for a Bali-based tour operator with package listings and booking CTA.", image: imgWeda, techStack: ["Next.js", "Tailwind"], link: "https://wedabalitoptours.com", tag: "Web", tier: "archive" },
  { id: 29, name: "Crochet Catalog", role: "Freelance Web Developer", description: "Product catalog site for a handmade crochet business with gallery and inquiry flow.", image: imgCrochet, techStack: ["Next.js", "Tailwind"], link: "https://crochet.axelano.space", tag: "Web", tier: "archive" },
  { id: 30, name: "Nusafish (Tukang Ikan)", role: "Freelance Web Developer", description: "Marketing site for a seafood/fish business with product listings and contact info.", image: imgNusafish, techStack: ["Next.js", "Tailwind"], link: "https://nusafish.axelano.space", tag: "Web", tier: "archive" },
  { id: 31, name: "Marrintis — Link", role: "Freelance Web Developer", description: "Link-in-bio microsite for the Marrintis brand consolidating socials and promos.", image: imgMarrintisLink, techStack: ["Next.js", "Tailwind"], link: "https://link-marrintis.axelano.space", tag: "Web", tier: "archive" },
  { id: 32, name: "Marrintis — Landing Page", role: "Freelance Web Developer", description: "Marketing landing page for the Marrintis brand with product info and CTA sections.", image: imgMarrintisLp, techStack: ["Next.js", "Tailwind"], link: "https://marrintis.axelano.space", tag: "Web", tier: "archive" },
  { id: 33, name: "Tax Landing Page", role: "Freelance Web Developer", description: "Marketing landing page for a tax consulting service with service info and lead capture.", image: imgLpTax, techStack: ["Next.js", "Tailwind"], link: "https://pajakita.axelano.space", tag: "Web", tier: "archive" },
  { id: 34, name: "Exzet Link-in-Bio", role: "Personal Project", description: "Personal link-in-bio microsite consolidating social profiles and project links.", image: imgExzetLink, techStack: ["Next.js", "Tailwind"], link: "https://link.axelano.space", tag: "Web", tier: "archive" },
  { id: 35, name: "Caturn Coin", role: "Freelance Web Developer", description: "Meme coin landing page with tokenomics, roadmap, and community sections.", image: imgCaturnCoin, techStack: ["Next.js", "Tailwind"], link: "https://caturn.axelano.space", tag: "Web3", tier: "web3" },
  { id: 36, name: "Miaoverse Coin", role: "Freelance Web Developer", description: "Cat-themed meme coin landing page with playful illustrations and live stats.", image: imgMiaoverseCoin, techStack: ["Next.js", "Tailwind"], link: "https://miaoverse.axelano.space", tag: "Web3", tier: "web3" },
  { id: 37, name: "Guochao Coin", role: "Freelance Web Developer", description: "Culture-themed meme coin landing page with tokenomics and roadmap sections.", image: imgGuochaoCoin, techStack: ["Next.js", "Tailwind"], link: "https://guochao.axelano.space", tag: "Web3", tier: "web3" },
  { id: 38, name: "Comic Coin", role: "Freelance Web Developer", description: "Comic-book-styled meme coin landing page with bold graphic panels.", image: imgComicCoin, techStack: ["Next.js", "Tailwind"], link: "https://comic.axelano.space", tag: "Web3", tier: "web3" },
  { id: 39, name: "Academy Coin", role: "Freelance Web Developer", description: "Education-themed meme coin landing page with tokenomics and roadmap sections.", image: imgAcademyCoin, techStack: ["Next.js", "Tailwind"], link: "https://academy.axelano.space", tag: "Web3", tier: "web3" },
  { id: 40, name: "PT. Mandala Amertha Kencana", role: "Freelance Web Developer", description: "Bilingual company profile for a building permit (PBG/SLF) consultant and architecture design firm in Bali.", image: imgLyani, techStack: ["Next.js", "Tailwind"], link: "https://lyani.axelano.space", tag: "Web", tier: "archive" },
  { id: 41, name: "Baby Puddle Coin", role: "Freelance Web Developer", description: "Meme coin landing page with soft pastel branding and community links.", image: imgBabyPuddle, techStack: ["Next.js", "Tailwind"], link: "https://baby-puddle.axelano.space", tag: "Web3", tier: "web3" },
  { id: 42, name: "Mingzy Coin", role: "Freelance Web Developer", description: "Meme coin landing page with tokenomics, roadmap, and buy flow.", image: imgMingzyCoin, techStack: ["Next.js", "Tailwind"], link: "https://mingzy-coin.axelano.space", tag: "Web3", tier: "web3" },
  { id: 43, name: "DyFashionStuff", role: "Freelance Web Developer", description: "E-commerce/fashion brand marketing site with product showcase.", image: imgDyFashionStuff, techStack: ["Next.js", "Tailwind"], link: "https://dyfashionstuff.axelano.space", tag: "Web", tier: "archive" },
  { id: 44, name: "Interior Contractor ERP", role: "Full-Stack Engineer", description: "Role-based ERP for an interior contractor — CRM leads, design/production SPK, procurement, and cashflow dashboards.", image: imgErp, techStack: ["Next.js", "TypeScript"], link: "https://erp.axelano.space", tag: "Platform", tier: "archive" },
  { id: 45, name: "Mingzy — Meme Coin Template", role: "Personal Project", description: "Reusable multi-tenant meme coin landing page template/generator, shown here with a placeholder demo identity.", image: imgMingzyDemo, techStack: ["Next.js", "Tailwind", "TypeScript"], link: "https://mingzy.axelano.space/fec", tag: "Web3", tier: "web3" },
  { id: 46, name: "Betting Platform Landing Page", role: "Freelance Web Developer", description: "Marketing landing page built with NextUI components.", image: imgLpBet, techStack: ["Next.js", "NextUI", "Tailwind"], link: "https://bet.axelano.space", tag: "Web", tier: "archive" },
  { id: 47, name: "Vela Coin", role: "Freelance Web Developer", description: "Dark editorial meme coin landing page with bento-grid hero and pre-rendered 3D gem visual.", image: null, techStack: ["Vite", "React", "Tailwind", "Framer Motion"], link: "https://vela.axelano.space", tag: "Web3", tier: "web3" },
  { id: 48, name: "Nebula Cat Coin", role: "Freelance Web Developer", description: "Meme coin landing page with custom mascot branding and community links.", image: null, techStack: ["Vite", "React", "Tailwind", "Framer Motion"], link: "https://nebula.axelano.space", tag: "Web3", tier: "web3" },
  { id: 49, name: "Bennydog Coin", role: "Freelance Web Developer", description: "Pet ID card themed meme coin landing page with paw-print decoration and speech-bubble FAQ.", image: null, techStack: ["Vite", "React", "Tailwind", "Framer Motion"], link: "https://bennydog.axelano.space", tag: "Web3", tier: "web3" },
  { id: 50, name: "Dragon Coin", role: "Freelance Web Developer", description: "Scouter/Dragon Radar themed meme coin landing page with flip-card FAQ mechanic.", image: null, techStack: ["Vite", "React", "Tailwind", "Framer Motion"], link: "https://dragon.axelano.space", tag: "Web3", tier: "web3" },
  { id: 17, name: "Siapenku", role: "Full-Stack Engineer", description: "Administrative data management for village governance — population data, letter management, and service delivery.", image: imgSiapenku, techStack: ["Laravel", "Vue.js", "MySQL"], link: "http://siapenku.stion.site", tag: "Web", tier: "archive" },
  { id: 18, name: "Villa Manis FinTech", role: "Full-Stack Engineer", description: "Financial reporting and accounting system for the hospitality industry with real-time analytics.", image: imgVillaManis, techStack: ["React", "Go", "PostgreSQL"], tag: "FinTech", tier: "archive" },
  { id: 19, name: "BN Shop Inventory", role: "Full-Stack Engineer", description: "Smart inventory management with real-time stock tracking, automated reorder alerts, and analytics dashboard.", image: imgBnShop, techStack: ["React", "Go", "Redis"], tag: "Web", tier: "archive" },
  { id: 20, name: "Teacher Payroll", role: "Mobile & Backend Engineer", description: "HR management mobile app with attendance tracking, leave management, and digital payroll for schools.", image: imgTeacherPayroll, techStack: ["Flutter", "Laravel", "MySQL"], tag: "Mobile", tier: "archive" },
  { id: 21, name: "Sujana Travel", role: "Full-Stack Engineer", description: "Tour & travel booking system with integrated payment processing, itinerary management, and customer portal.", image: imgSujana, techStack: ["React", "Go", "Stripe API"], tag: "Web", tier: "archive" },
];

export const TAG_COLOR: Record<string, string> = {
  Backend: "bg-white/5 text-white/65 border-white/12",
  Mobile: "bg-white/5 text-white/65 border-white/12",
  Web: "bg-white/5 text-white/60 border-white/10",
  Platform: "bg-white/5 text-white/65 border-white/12",
  FinTech: "bg-white/5 text-white/65 border-white/12",
  AI: "bg-accent/10 text-accent border-accent/20",
  QA: "bg-white/5 text-white/50 border-white/10",
  Internal: "bg-white/5 text-white/50 border-white/10",
  Web3: "bg-white/5 text-white/50 border-white/10",
};
