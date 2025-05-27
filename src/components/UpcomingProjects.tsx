import ProjectCard from './ProjectCard'

const upcomingProjects = [
  {
    title: "Motion Components",
    description: "Professional, modern and beautiful framer motion components built with Next.js and TailwindCSS",
    href: "https://aceternity.com/components",
    technologies: ["NextJS", "Tailwind", "framer-motion"],
    icon: "🎬"
  },
  {
    title: "VSCode Resume",
    description: "A VSCode themed resume for all the web developers out there. A UI which looks exactly like a React file-system based VSCode window with create and update operations.",
    href: "#",
    technologies: ["VSCode", "React", "TypeScript"],
    icon: "💼"
  },
  {
    title: "More projects coming soon..",
    description: "I get ideas all day , All of them are updated here as soon as I start working on them.",
    href: "#",
    technologies: ["Coming Soon"],
    icon: "🚀"
  }
]

export default function UpcomingProjects() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Upcoming Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  )
}
