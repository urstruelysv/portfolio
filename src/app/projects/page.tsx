import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import UpcomingProjects from "@/components/UpcomingProjects";
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";

const projects = [
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
      "E-commerce website for a packaged drinking water brand called cirro - purest of all",
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
];

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="items-start max-w-3xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Projects
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              I've developed commercial projects as well as hobby projects. All
              projects are included here.
            </p>
            <p className="text-lg text-gray-600">
              Check out my{" "}
              <Link
                href="/blogs"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Blogs
              </Link>{" "}
              while you're here. I write about my learnings and technology.
            </p>
          </div>

          <section className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </section>
          <div className="mx-auto flex justify-center ">
            <Link
              href="https://github.com/urstruelysv"
              className="inline-flex items-center gap-2 px-4 py-2 text-base text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span>See all projects at</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <UpcomingProjects />
          <ContactSection />
        </Container>
      </main>
      <Footer />
    </>
  );
}
