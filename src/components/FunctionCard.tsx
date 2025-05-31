import Link from "next/link";
import Image from "next/image";

interface FunctionCardProps {
  title: string;
  slug: string;
  description: string;
  logo?: string;
}

export default function FunctionCard({
  title,
  slug,
  description,
  logo,
}: FunctionCardProps) {
  return (
    <Link
      href={`/snippets/${slug}`}
      className="w-full p-6 border border-gray-200 rounded-lg hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-all hover:shadow-lg dark:hover:shadow-gray-800/50"
    >
      <div className="flex items-start space-x-4">
        {logo ? (
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={`/logos/${logo}`}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-12 h-12 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🧩</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
