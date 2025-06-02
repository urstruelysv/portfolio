"use client";

import Image from "next/image";
import { useState } from "react";

interface BlurImageProps {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: string;
  layout?: string;
}

export function BlurImage({
  src,
  alt = "",
  className = "",
  objectFit = "cover",
  layout = "fill",
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          duration-700 ease-in-out
          ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }
          ${objectFit === "cover" ? "object-cover" : "object-contain"}
        `}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
