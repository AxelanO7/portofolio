/**
 * "The Build Graph" — data model for the signature 3D constellation.
 *
 * Encodes Jeremia's two-act narrative:
 *   Act I  — Foundation (pre-AI): broad, self-driven engineering range.
 *   Act II — AI-native (now): builds & operates AI (own model, agents, automation).
 *
 * Nodes carry an `act` (drives colour + which lobe they cluster into) and a
 * `weight` (drives node size + halo intensity). Edges are meaningful: bridge
 * edges connect Foundation skills that carried into the AI era.
 */

export type Act = "core" | "foundation" | "ai";

export interface GraphNode {
  id: string;
  label: string;
  sub?: string; // short qualifier shown on hover
  act: Act;
  weight: number; // 0..1 → size / glow
}

export interface GraphEdge {
  a: string;
  b: string;
  bridge?: boolean; // Foundation → AI carry-over
}

export const NODES: GraphNode[] = [
  // ── Core identity ─────────────────────────────────────────────
  { id: "core", label: "Jeremia Axelano", sub: "Engineer · Architect · CTO", act: "core", weight: 1 },

  // ── Act I — Foundation (pre-AI) ───────────────────────────────
  { id: "go", label: "Golang", sub: "written while Mobile Lead", act: "foundation", weight: 0.92 },
  { id: "linux", label: "Linux & Servers", sub: "self-driven DevOps early", act: "foundation", weight: 0.82 },
  { id: "devops", label: "DevOps · CI/CD", act: "foundation", weight: 0.72 },
  { id: "flutter", label: "Flutter", sub: "cross-platform at scale", act: "foundation", weight: 0.86 },
  { id: "rn", label: "React Native", act: "foundation", weight: 0.7 },
  { id: "next", label: "Next.js", act: "foundation", weight: 0.78 },
  { id: "react", label: "React", act: "foundation", weight: 0.72 },
  { id: "vue", label: "Vue.js", act: "foundation", weight: 0.5 },
  { id: "laravel", label: "Laravel · PHP", act: "foundation", weight: 0.55 },
  { id: "pg", label: "PostgreSQL", act: "foundation", weight: 0.6 },
  { id: "mongo", label: "MongoDB", act: "foundation", weight: 0.5 },
  { id: "mobilelead", label: "Mobile Eng. Lead", sub: "BTW Edutech · led team", act: "foundation", weight: 0.74 },
  { id: "jobseeker", label: "Sr Mobile Engineer", sub: "Jobseeker", act: "foundation", weight: 0.62 },
  { id: "freelance", label: "6+ yrs Freelance", sub: "full-stack range", act: "foundation", weight: 0.7 },

  // ── Act II — AI-native (now) ──────────────────────────────────
  { id: "lerka", label: "Lerka", sub: "compare-first AI · NDS R&D · closed beta", act: "ai", weight: 0.96 },
  { id: "agents", label: "Agentic AI", sub: "multi-agent orchestration", act: "ai", weight: 0.9 },
  { id: "rag", label: "RAG Pipelines", act: "ai", weight: 0.7 },
  { id: "ollama", label: "Local LLMs · Ollama", act: "ai", weight: 0.68 },
  { id: "aiops", label: "AI VPS Automation", sub: "agents run DevOps", act: "ai", weight: 0.8 },
  { id: "voice", label: "Whisper · TTS", sub: "AI podcast pipeline", act: "ai", weight: 0.55 },
  { id: "n8n", label: "Workflow Automation", act: "ai", weight: 0.55 },
  { id: "micro", label: "Go Microservices", sub: "API gateway · 6 services", act: "ai", weight: 0.82 },
  { id: "guestlist", label: "Guestlist", sub: "CTO · full ecosystem", act: "ai", weight: 0.98 },
  { id: "aitools", label: "AI Coding Agents", sub: "Claude Code · Codex · OpenCode · Hermes", act: "ai", weight: 0.6 },
  { id: "aidesign", label: "AI Design Tools", sub: "Google Stitch · v0", act: "ai", weight: 0.45 },
];

export const EDGES: GraphEdge[] = [
  // Core → primary hubs
  { a: "core", b: "go" },
  { a: "core", b: "flutter" },
  { a: "core", b: "guestlist" },
  { a: "core", b: "lerka" },
  { a: "core", b: "agents" },
  { a: "core", b: "freelance" },
  { a: "core", b: "mobilelead" },

  // Foundation internal
  { a: "go", b: "linux" },
  { a: "linux", b: "devops" },
  { a: "flutter", b: "rn" },
  { a: "flutter", b: "mobilelead" },
  { a: "rn", b: "jobseeker" },
  { a: "next", b: "react" },
  { a: "react", b: "vue" },
  { a: "laravel", b: "pg" },
  { a: "pg", b: "mongo" },
  { a: "freelance", b: "laravel" },
  { a: "freelance", b: "next" },
  { a: "mobilelead", b: "jobseeker" },

  // AI internal
  { a: "lerka", b: "agents" },
  { a: "lerka", b: "ollama" },
  { a: "lerka", b: "voice" },
  { a: "agents", b: "rag" },
  { a: "agents", b: "aiops" },
  { a: "aiops", b: "n8n" },
  { a: "guestlist", b: "micro" },
  { a: "guestlist", b: "agents" },
  { a: "agents", b: "aitools" },
  { a: "aitools", b: "aidesign" },

  // ── Bridges: Foundation → AI carry-over (the story) ──
  { a: "go", b: "micro", bridge: true },
  { a: "linux", b: "aiops", bridge: true },
  { a: "devops", b: "aiops", bridge: true },
  { a: "next", b: "guestlist", bridge: true },
  { a: "flutter", b: "guestlist", bridge: true },
  { a: "freelance", b: "lerka", bridge: true },
];

// Act colours (linear-ish RGB used directly in shaders).
// Monochrome + one accent: Foundation renders neutral (the base), AI-native
// renders in the single accent (the layer AI added). Narrative reads through
// intensity, not a second hue.
export const ACT_COLOR: Record<Act, [number, number, number]> = {
  core: [1.0, 1.0, 1.0],
  foundation: [0.72, 0.72, 0.7], // neutral gray-white
  ai: [0.788, 0.659, 0.459], // accent — #c9a875
};

// Brighter expression of the SAME accent, reserved for the two AI flagships
// (Lerka, Guestlist) — intensity signals importance, not a new colour.
export const FLAGSHIP_WARM = new Set(["lerka", "guestlist"]);
export const WARM_COLOR: [number, number, number] = [0.91, 0.792, 0.627]; // accent-bright — #e8caa0
