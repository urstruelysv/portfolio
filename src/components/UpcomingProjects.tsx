import ProjectCard from "./ProjectCard";

const upcomingProjects = [
  {
    title: "Holome.ai",

    description:
      "AI that help content creators save time and money as they'll no longer need to travel or hire expensive photographers to do photoshoots",
    href: "#",

    technologies: ["NextJS", "Tailwind", "Flux", "Openai"],
    icon: "🎬",
  },
  {
    title: "Video",
    description: "AI-powered tools to enhance video production efficiency.",
    href: "#",
    technologies: ["VSCode", "React", "TypeScript"],
    icon: "💼",
  },
  {
    title: "More projects coming soon..",
    description:
      "I get ideas all day , All of them are updated here as soon as I start working on them.",
    href: "#",
    technologies: ["Coming Soon"],
    icon: "🚀",
  },
];

export default function UpcomingProjects() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Upcoming Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
