/** Tech arsenal: only technologies evidenced in real repositories, production systems or the CV. */

export interface Stack {
  name: string;
  color: string;
  tools: string[];
}

export const ARSENAL: Stack[] = [
  { name: "Languages", color: "#e9c27d", tools: ["Go", "TypeScript", "JavaScript", "Python", "Dart", "Java", "PHP", "SQL"] },
  { name: "Frontend", color: "#2dd4e8", tools: ["Next.js", "React", "Vue", "Angular", "Astro", "Vite", "Tailwind", "HeroUI", "shadcn/ui", "Framer Motion", "Three.js"] },
  { name: "Mobile", color: "#4fe0bd", tools: ["Flutter", "React Native", "Expo", "Java Android", "GetX", "BLoC", "EAS builds"] },
  { name: "Backend", color: "#7cebf7", tools: ["Gin", "Fiber", "FastAPI", "Express", "Laravel", "API gateway", "SSE / WebSocket", "Payment gateway"] },
  { name: "Data", color: "#e9c27d", tools: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "pgvector", "Neo4j", "Firebase", "MySQL"] },
  { name: "Cloud and DevOps", color: "#2dd4e8", tools: ["Docker", "Coolify", "Woodpecker CI", "Cloudflare", "nginx", "Linux VPS", "Vercel", "AWS", "Prometheus", "Grafana", "Loki", "Alertmanager"] },
  { name: "AI and automation", color: "#ff7b5c", tools: ["Claude Code", "MCP", "n8n", "LiteLLM", "Ollama", "OpenRouter", "RAG", "Whisper", "LLM gateway"] },
  { name: "Web3", color: "#4fe0bd", tools: ["Astro launch sites", "Vite + React sites", "BSC RPC", "DexScreener API", "wagmi", "Reown wallet connect"] },
  { name: "Advanced SEO", color: "#7cebf7", tools: ["Search Console", "Schema / JSON-LD", "Meta Pixel", "UTM attribution", "Core Web Vitals", "AEO / GEO"] },
  { name: "Testing and tools", color: "#e9c27d", tools: ["Playwright", "Cypress", "Lighthouse", "Linear", "Git", "Postman", "Google Stitch"] },
];

export const TOOL_COUNT = ARSENAL.reduce((n, s) => n + s.tools.length, 0);

/** Pairs that get a faint cross-link in the 3D graph. */
export const CROSS_LINKS: [string, string][] = [
  ["Go", "Gin"], ["Go", "Fiber"], ["TypeScript", "Next.js"], ["TypeScript", "React"], ["Dart", "Flutter"],
  ["Java", "Java Android"], ["Python", "FastAPI"], ["PHP", "Laravel"], ["Next.js", "Vercel"], ["Expo", "React Native"],
  ["React Native", "TypeScript"], ["Docker", "Coolify"], ["Prometheus", "Grafana"], ["Grafana", "Loki"], ["n8n", "LiteLLM"],
  ["Ollama", "RAG"], ["Claude Code", "MCP"], ["PostgreSQL", "Supabase"], ["Playwright", "Cypress"], ["Meta Pixel", "UTM attribution"],
  ["Search Console", "Schema / JSON-LD"], ["Core Web Vitals", "Next.js"], ["AEO / GEO", "Schema / JSON-LD"], ["Astro launch sites", "Astro"],
  ["Vite + React sites", "Vite"], ["Three.js", "Framer Motion"], ["Redis", "Go"], ["MongoDB", "Go"], ["Neo4j", "RAG"],
  ["Whisper", "LLM gateway"], ["BSC RPC", "Go"], ["Woodpecker CI", "Docker"], ["Tailwind", "Next.js"], ["Python", "Ollama"],
  ["Firebase", "Flutter"], ["wagmi", "Reown wallet connect"],
];
