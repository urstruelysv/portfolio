import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import TechBadge from './TechBadge'

interface ProjectCardProps {
  title: string
  description: string
  href: string
  technologies: string[]
  icon?: string
}

export default function ProjectCard({ title, description, href, technologies, icon }: ProjectCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            {icon && (
              <div className="text-2xl shrink-0">{icon}</div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <TechBadge key={index}>{tech}</TechBadge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
