interface ResourcesCardProps {
  title: string;
  link: string;
  websiteLink: string;
  description: string;
}

export default function ResourcesCard({
  title,
  link,
  websiteLink,
  description,
}: ResourcesCardProps) {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg dark:border-gray-800">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
      >
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
          {websiteLink}
        </p>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </a>
    </div>
  );
}
