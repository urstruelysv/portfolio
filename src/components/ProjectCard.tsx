import Link from "next/link";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  technologies: string[];
  icon?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  technologies,
  icon,
}: ProjectCardProps) {
  return (
    <Link href={href} className="block">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            {icon && <div className="text-2xl shrink-0">{icon}</div>}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <TechBadge key={index}>{tech}</TechBadge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
