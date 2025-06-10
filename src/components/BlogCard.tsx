import Link from "next/link";
import { format } from "date-fns";

interface BlogCardProps {
  title?: string;
  slug: string;
  description?: string;
  date: string;
  author: string;
}

export default function BlogCard({
  title = "Untitled",
  slug,
  description = "No description available",
  date,
  author,
}: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="w-full p-6 border border-gray-200 rounded-lg hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-all hover:shadow-lg dark:hover:shadow-gray-800/50"
    >
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{author}</span>
          <time dateTime={date}>{format(new Date(date), "MMM d, yyyy")}</time>
        </div>
      </div>
    </Link>
  );
}
