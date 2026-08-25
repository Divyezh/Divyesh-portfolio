// ─── SOCIALS ──────────────────────────────────────────────
export const Socials = [
  { name: "GitHub", src: "/assets/github-icon.svg", href: "https://github.com/Divyezh" },
  { name: "LinkedIn", src: "/assets/linkedin-app-icon.svg", href: "https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/" },
  { name: "Email", src: "/assets/google-gmail-svgrepo-com.svg", href: "mailto:sonidivyesh2004@gmail.com" },
];

// ─── SKILL DATA (marquee top row — headline skills) ────────
export const Skill_data = [
  { skill_name: "Next.js 14", Image: "/assets/next-js-svgrepo-com.svg", width: 80, height: 80 },
  { skill_name: "React.js", Image: "/assets/react-svgrepo-com.svg", width: 80, height: 80 },
  { skill_name: "TypeScript", Image: "/assets/typescript-svgrepo-com.svg", width: 80, height: 80 },
  { skill_name: "Tailwind CSS", Image: "/assets/tailwind-css-svgrepo-com.svg", width: 80, height: 80 },
  { skill_name: "Node.js", Image: "/assets/node-js-icon.svg", width: 80, height: 80 },
  { skill_name: "PostgreSQL", Image: "/assets/postgresql-logo-svgrepo-com.svg", width: 80, height: 80 },
  { skill_name: "Prisma ORM", Image: "/assets/prisma-icon.svg", width: 70, height: 70 },
  { skill_name: "Claude / OpenAI API", Image: "/assets/claude-ai-icon.svg", width: 80, height: 80 },
];

// ─── FRONTEND SKILLS ──────────────────────────────────────
export const Frontend_skill = [
  { skill_name: "React.js", Image: "/assets/react-svgrepo-com.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "Next.js 14", Image: "/assets/next-js-svgrepo-com.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "TypeScript", Image: "/assets/typescript-svgrepo-com.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "Tailwind CSS", Image: "/assets/tailwind-css-svgrepo-com.svg", width: 80, height: 80, level: "Expert" },
  { skill_name: "JavaScript", Image: "/assets/javascript-programming-language-icon.svg", width: 65, height: 65, level: "Advanced" },
  { skill_name: "Framer Motion", Image: "/assets/framer-black-icon.svg", width: 80, height: 80, level: "Intermediate" },
  { skill_name: "HTML 5", Image: "/assets/html-icon.svg", width: 80, height: 80, level: "Expert" },
  { skill_name: "CSS 3", Image: "/assets/css-icon.svg", width: 80, height: 80, level: "Expert" },
];

// ─── BACKEND SKILLS ───────────────────────────────────────
export const Backend_skill = [
  { skill_name: "Node.js", Image: "/assets/node-js-icon.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "Express.js", Image: "/assets/express-js-icon.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "PostgreSQL", Image: "/assets/postgresql-logo-svgrepo-com.svg", width: 80, height: 80, level: "Intermediate" },
  { skill_name: "Prisma ORM", Image: "/assets/prisma-icon.svg", width: 70, height: 70, level: "Advanced" },
  { skill_name: "MongoDB", Image: "/assets/mongodb-icon.svg", width: 40, height: 40, level: "Intermediate" },
  { skill_name: "REST APIs", Image: "/assets/rest-api-icon.svg", width: 70, height: 70, level: "Advanced" },
  { skill_name: "JWT Auth", Image: "/assets/jsonwebtokens-svgrepo-com.svg", width: 70, height: 70, level: "Advanced" },
  { skill_name: "Firebase", Image: "/assets/google-firebase-icon.svg", width: 55, height: 55, level: "Intermediate" },
];

// ─── AI / LLM SKILLS ─────────────────────────────────────
export const AI_skill = [
  { skill_name: "Claude API", Image: "/assets/claude-ai-icon.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "OpenAI API", Image: "/assets/openai-icon.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "Gemini API", Image: "/assets/google-gemini-icon.svg", width: 80, height: 80, level: "Intermediate" },
  { skill_name: "Prompt Engineering", Image: "/assets/prompt-svgrepo-com.svg", width: 70, height: 70, level: "Advanced" },
];

// ─── FULL STACK / DEVOPS ─────────────────────────────────
export const Full_stack = [
  { skill_name: "Git / GitHub", Image: "/assets/git-icon.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "Vercel", Image: "/assets/vercel-icon-svgrepo-com.svg", width: 80, height: 80, level: "Advanced" },
  { skill_name: "Docker", Image: "/assets/docker-icon.svg", width: 70, height: 70, level: "Intermediate" },
  { skill_name: "Figma", Image: "/assets/figma-icon.svg", width: 50, height: 50, level: "Intermediate" },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: "AI & SaaS" | "Full Stack" | "Healthcare" | "Interactive Web";
  description: string;
  longDescription?: string;
  image: string;
  link: string;
  github?: string;
  tags: string[];
  featured?: boolean;
  metrics?: string;
}

// ─── PROJECTS ────────────────────────────────────────────
export const Projects: ProjectItem[] = [
  {
    id: "velvet-ai",
    title: "VELVET.AI",
    category: "AI & SaaS",
    description:
      "AI-powered SaaS website builder that generates production-ready web applications from natural language prompts using Anthropic Claude. Implemented prompt-chaining with real-time SSE streaming.",
    longDescription:
      "Features a robust prompt-chaining pipeline with 90%+ structural generation accuracy, real-time Server-Sent Events (SSE) streaming reducing perceived latency by 45%, and interactive React canvas preview.",
    image: "/projects/velvet-ai.png",
    link: "https://github.com/Divyezh",
    github: "https://github.com/Divyezh",
    tags: ["Next.js 14", "Claude API", "Prisma", "TypeScript", "SSE"],
    featured: true,
    metrics: "45% Latency Reduction",
  },
  {
    id: "ojas-hospital",
    title: "Ojas Hospital",
    category: "Healthcare",
    description:
      "Modern healthcare management portal & patient booking system featuring doctor scheduling, OPD appointments, real-time patient queue, and department telemetry.",
    longDescription:
      "Comprehensive hospital management web application designed for seamless patient intake, specialized doctor directory (Cardiology, Neurology, etc.), digital OPD appointments, and responsive patient records portal.",
    image: "/projects/ojas-hospital.png",
    link: "https://www.ojashospitalmultispecility.com/",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
    featured: true,
    metrics: "Live Hospital Portal",
  },
  {
    id: "arijit-world",
    title: "Arijit World",
    category: "Interactive Web",
    description:
      "Interactive musical portal & discography web experience for Arijit Singh fans, featuring dynamic audio visualizers, concert tour timeline, and curated mood playlists.",
    longDescription:
      "An immersive audio-visual platform with interactive soundscapes, song discovery, synced lyric visualization, concert tour schedules, and dark cinematic UI aesthetic.",
    image: "/projects/arijit-world.png",
    link: "https://arijit-world.vercel.app/",
    tags: ["React", "Next.js", "Web Audio API", "Framer Motion", "Tailwind"],
    featured: true,
    metrics: "Live Music Experience",
  },
  {
    id: "space-portfolio",
    title: "3D Space Portfolio",
    category: "Interactive Web",
    description:
      "High-performance developer portfolio built with Next.js 14, Three.js, and Framer Motion, featuring interactive 3D particle systems and GPU-accelerated motion.",
    longDescription:
      "Showcases custom Three.js star fields, interactive orbiting tech nodes, responsive layout mechanics, and fluid scroll-based animations.",
    image: "/projects/portfolio.png",
    link: "https://github.com/Divyezh",
    github: "https://github.com/Divyezh/Divyesh-portfolio",
    tags: ["Next.js 14", "Three.js", "Framer Motion", "Tailwind CSS"],
    featured: false,
    metrics: "100% Responsive",
  },
];

// ─── NAV LINKS ────────────────────────────────────────────
export const NavLinks = [
  { name: "About", href: "#about-me" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Radar", href: "#radar" },
  { name: "Contact", href: "#contact" },
];

