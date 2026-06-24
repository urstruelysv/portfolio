"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "RepoFox",
    description:
      "AI-powered repository intelligence. Analyze codebases, generate docs, and map architecture instantly.",
    href: "https://repofox-web.vercel.app/",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "AI SDK",
      "GitHub API",
      "Vercel"
    ],
    icon: "🦊"
  },
  {
    title: "Myna",
    description:
      "WhatsApp-powered chat platform. Connect directly with website visitors through WhatsApp to manage conversations.",
    href: "https://myna-lake.vercel.app/",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "WhatsApp API",
      "PostgreSQL",
      "Vercel"
    ],
    icon: "🐦"
  },
  {
    title: "AutoCommit CLI",
    description:
      "AI-driven CLI tool. Generate clean, reviewable commit messages automatically from your staged diffs.",
    href: "https://autocommitcli.aethoscompany.in/",
    technologies: ["Python", "CLI", "Git", "Gemini API", "OpenAI API", "Groq"],
    icon: "✨",
  },
  {
    title: "DownloadAnything",
    description:
      "Universal high-speed downloader. Capture and save files instantly from anywhere on the web.",
    href: "https://downloadanything.vercel.app",
    technologies: ["FullStack", "Next.js", "React", "TailwindCSS", "API"],
    icon: "🧠",
  },
  {
    title: "cirro",
    description:
      "E-commerce platform for premium bottled water. Fast, sleek interface with modern shopping workflows.",
    href: "https://cirrowtr.in",
    technologies: [
      "Next.js",
      "React",
      "TailwindCSS",
      "Full-Stack",
      "Framer-motion",
    ],
    icon: "⚡",
  },
];

export default function ProjectsSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <div className="space-y-6">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <Link
          href="/projects"
          className="inline-block text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors"
        >
          See More →
        </Link>
      </div>
    </section>
  );
}
