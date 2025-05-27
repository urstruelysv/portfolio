import { Badge } from "@/components/ui/badge";

interface TechBadgeProps {
  children: React.ReactNode;
}

export default function TechBadge({ children }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
      {children}
    </span>
  );
}
