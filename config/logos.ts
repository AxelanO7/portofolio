/** Tool name -> symbol id in /public/logos/sprite.svg (Simple Icons, CC0). Tools without a mark stay text only. */
export const LOGO: Record<string, string> = {
  Go: "go", TypeScript: "typescript", JavaScript: "javascript", Python: "python", Dart: "dart", Java: "openjdk", PHP: "php",
  "Next.js": "nextdotjs", React: "react", Vue: "vuedotjs", Angular: "angular", Astro: "astro", Vite: "vite", Tailwind: "tailwindcss",
  "shadcn/ui": "shadcnui", "Framer Motion": "framer", "Three.js": "threedotjs",
  Flutter: "flutter", "React Native": "react", Expo: "expo", "Java Android": "android", "EAS builds": "expo",
  Gin: "gin", FastAPI: "fastapi", Express: "express", Laravel: "laravel",
  PostgreSQL: "postgresql", MongoDB: "mongodb", Redis: "redis", Supabase: "supabase", pgvector: "postgresql", Neo4j: "neo4j", Firebase: "firebase", MySQL: "mysql",
  Docker: "docker", Coolify: "coolify", Cloudflare: "cloudflare", nginx: "nginx", "Linux VPS": "linux", Vercel: "vercel", AWS: "amazonwebservices", Prometheus: "prometheus", Grafana: "grafana", Loki: "grafana", Alertmanager: "prometheus",
  "Claude Code": "claude", MCP: "modelcontextprotocol", n8n: "n8n", Ollama: "ollama", OpenRouter: "openrouter", Whisper: "openai",
  wagmi: "wagmi", "Astro launch sites": "astro", "Vite + React sites": "vite",
  "Search Console": "googlesearchconsole", "Meta Pixel": "meta", "Core Web Vitals": "google",
  Cypress: "cypress", Lighthouse: "lighthouse", Linear: "linear", Git: "git", Postman: "postman", "Google Stitch": "google",
};

/** Social and store marks used in the contact block. */
export const BRAND = { github: "github", linkedin: "linkedin", whatsapp: "whatsapp", mail: "gmail", play: "googleplay" } as const;
