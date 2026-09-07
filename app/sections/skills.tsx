"use client";

import { m as motion } from "framer-motion";

interface Skill {
  name: string;
  slug?: string;
}
interface Group {
  label: string;
  skills: Skill[];
}

function Icon({ slug }: { slug?: string }) {
  if (!slug) return null;
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/e9ebf5`}
      alt=""
      className="h-4 w-4 opacity-80"
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

const FOUNDATION: Group[] = [
  {
    label: "Languages",
    skills: [
      { name: "Golang", slug: "go" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "PHP", slug: "php" },
      { name: "Kotlin", slug: "kotlin" },
      { name: "Swift", slug: "swift" },
      { name: "Dart", slug: "dart" },
      { name: "C++", slug: "cplusplus" },
      { name: "C#" },
    ],
  },
  {
    label: "Mobile & Web",
    skills: [
      { name: "Flutter", slug: "flutter" },
      { name: "React Native", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "Vue.js", slug: "vuedotjs" },
      { name: "Angular", slug: "angular" },
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      { name: "Gin", slug: "go" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Laravel", slug: "laravel" },
      { name: ".NET", slug: "dotnet" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
      { name: "Coolify", slug: "coolify" },
      { name: "Grafana", slug: "grafana" },
      { name: "Vercel", slug: "vercel" },
    ],
  },
];

const AI_NATIVE: Group[] = [
  {
    label: "Models & Runtime",
    skills: [
      { name: "Ollama", slug: "ollama" },
      { name: "OpenAI" },
      { name: "DeepSeek", slug: "deepseek" },
      { name: "Claude / Anthropic", slug: "anthropic" },
      { name: "OpenRouter", slug: "openrouter" },
    ],
  },
  {
    label: "Agentic Coding",
    skills: [
      { name: "Claude Code", slug: "claude" },
      { name: "Codex CLI" },
      { name: "OpenCode", slug: "opencode" },
      { name: "Hermes Agent" },
    ],
  },
  {
    label: "Agentic Systems",
    skills: [
      { name: "AI Agents" },
      { name: "RAG Pipelines" },
      { name: "Workflow Automation", slug: "n8n" },
      { name: "Multi-model Orchestration" },
    ],
  },
  {
    label: "Voice & Streaming",
    skills: [
      { name: "Whisper ASR" },
      { name: "Text-to-Speech" },
      { name: "Real-time Streaming" },
    ],
  },
  {
    label: "Design & Prototyping",
    skills: [
      { name: "Google Stitch" },
      { name: "v0", slug: "v0" },
    ],
  },
  {
    label: "AI-run Ops",
    skills: [
      { name: "AI VPS Automation" },
      { name: "Agent-driven CI/CD" },
      { name: "Supabase", slug: "supabase" },
    ],
  },
];

function SkillColumn({
  title,
  tone,
  groups,
  delay = 0,
}: {
  title: string;
  tone: "neutral" | "accent";
  groups: Group[];
  delay?: number;
}) {
  const dot = tone === "neutral" ? "bg-white/60" : "bg-accent";
  const ring = tone === "neutral" ? "text-white/70" : "text-accent";
  const chipHover =
    tone === "neutral"
      ? "hover:border-white/30 hover:text-white"
      : "hover:border-accent/30 hover:text-accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-3xl border-white/8 p-7 md:p-8"
    >
      <div className="mb-6 flex items-center gap-2.5">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <h3 className={`font-tech text-xs font-bold uppercase tracking-[0.2em] ${ring}`}>
          {title}
        </h3>
      </div>

      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-white/35">
              {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <span
                  key={s.name}
                  className={`flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.02] px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors ${chipHover}`}
                >
                  <Icon slug={s.slug} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillSection() {
  return (
    <section id="skills" className="relative w-full overflow-hidden bg-ink-elev py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="font-tech text-xs uppercase tracking-[0.28em] text-white/40">
            Capabilities
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Two eras, one <span className="underline decoration-2 underline-offset-4">toolkit</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SkillColumn title="Foundation" tone="neutral" groups={FOUNDATION} />
          <SkillColumn title="AI-Native" tone="accent" groups={AI_NATIVE} delay={0.1} />
        </div>
      </div>
    </section>
  );
}
