import { Badge } from '@/components/ui/badge'

interface TechBadgeProps {
  children: React.ReactNode
}

export default function TechBadge({ children }: TechBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
    >
      {children}
    </Badge>
  )
}
