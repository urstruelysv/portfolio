"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Moonbeam",
    description:
      "Never write from scratch again. Kickstart your next great writing piece with Moonbeam. Your long-form writing AI assistant.",
    href: "https://gomoonbeam.com",
    technologies: [
      "Front-end",
      "GPT-3",
      "Next.js",
      "React",
      "TailwindCSS",
      "Chrome Extension",
    ],
    icon: "🌙",
  },
  {
    title: "Aceternity",
    description:
      "Building modern applications that scale well and are easy to maintain. Cutting edge websites with a pinch of magic, and a lot of love.",
    href: "https://aceternity.com",
    technologies: ["Next.js", "React", "TailwindCSS", "Full-Stack"],
    icon: "⚡",
  },
  {
    title: "Algochurn",
    description:
      "Practice the most popular algorithmic questions and Front-end interview questions with an interactive IDE and learning environment.",
    href: "https://algochurn.com",
    technologies: ["Next.js", "React", "TailwindCSS", "Monaco", "Algorithms"],
    icon: "🧠",
  },
  {
    title: "Tailwind Master Kit",
    description:
      "Beautiful, Handcrafted, ready-to-use components and templates for your next Tailwind web app project.",
    href: "https://tailwindmasterkit.com/",
    technologies: ["Tailwind", "Next.js", "Freemium"],
    icon: "🎨",
  },
  {
    title: "PlaceholderTech",
    description:
      "We build modern, blazing-fast web applications which helps your business grow and increase sales.",
    href: "https://placeholdertech.in/",
    technologies: ["Web Dev Agency", "Products", "Freemium"],
    icon: "🏢",
  },
  {
    title: "Feedmeback",
    description:
      "The easiest way to add comments or reviews to your static site. Built as part of React 2025.",
    href: "https://feedmeback-beta.vercel.app/",
    technologies: ["Next.js", "Stripe", "TailwindCSS"],
    icon: "💬",
  },
];

export default function ProjectsSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <div className="space-y-6">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-2 text-black dark:text-white">
          Projects
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
