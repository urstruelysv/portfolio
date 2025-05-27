"use client";

import { useState } from "react";
import { BlurImage } from "./BlurImage";

interface LinkPreviewProps {
  url: string;
  title: string;
  description: string;
  image: string;
}

export function LinkPreview({
  url,
  title,
  description,
  image,
}: LinkPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <BlurImage
            src={image}
            alt={title}
            className="rounded-md"
            objectFit="cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
