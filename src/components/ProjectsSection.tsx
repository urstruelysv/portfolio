"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AutoCommit CLI",
    description:
      "CLI that turns staged diffs into clean, reviewable commit messages with provider-agnostic AI (OpenAI, Groq, Gemini).",
    href: "https://autocommitcli.aethoscompany.in/",
    technologies: ["Python", "CLI", "Git", "Gemini API", "OpenAI API", "Groq"],
    icon: "✨",
  },
  {
    title: "Aethos vision Labs",
    description:
      "helping businesses and brands turn views into cash with AI solutions and video content.",
    href: "https://www.aethoscompany.in",
    technologies: ["Front-end", "Next.js", "React", "TailwindCSS"],
    icon: "🌙",
  },
  {
    title: "cirro",
    description:
      "E-commerce website for a packaged drinking water brand cirro - purest of all",
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
  {
    title: "EchoBoard",
    description:
      "A drop-in, privacy-respecting comment & feedback widget for any static or dynamic site.",
    href: "https://EchoBoard-beta.vercel.app/",
    technologies: [
      "Next.js",
      "Stripe",
      "TailwindCSS",
      "Framer",
      "custom-auth",
      "Open-ai",
      "Vercel-SDK",
    ],
    icon: "💬",
  },
  {
    title: "DownloadAnything",
    description:
      "Universal download solution, download anything from anywhere super fast.",
    href: "https://downloadanything.vercel.app",
    technologies: ["FullStack", "Next.js", "React", "TailwindCSS", "API"],
    icon: "🧠",
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
          {projects.map((project, index) => (
            <div key={index}>
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
