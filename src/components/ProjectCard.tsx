"use client";
import Link from "next/link";
import TechBadge from "./TechBadge";
import { useState, useRef } from "react";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate dynamic shadow based on cursor position
  const getDynamicShadow = () => {
    if (!isHovered || !cardRef.current) return "";

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate offset from center
    const offsetX = (mousePosition.x - centerX) / centerX;
    const offsetY = (mousePosition.y - centerY) / centerY;

    // Create subtle shadow offset (opposite direction of cursor)
    const shadowX = -offsetX * 6; // Reduced from 15 to 6
    const shadowY = -offsetY * 6;

    // Calculate shadow intensity based on distance from center
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const intensity = Math.min(1, distance * 0.8);

    return `${shadowX}px ${shadowY}px ${12 + intensity * 4}px rgba(0, 0, 0, ${
      0.08 + intensity * 0.06
    })`;
  };

  return (
    <Link href={href} className="block h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 cursor-pointer h-full flex flex-col relative overflow-hidden"
        style={{
          boxShadow: isHovered
            ? getDynamicShadow()
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Light mode cursor-following hover effect */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 dark:hidden"
            style={{
              background: `radial-gradient(600px 600px ellipse at ${mousePosition.x}px ${mousePosition.y}px, rgba(148, 181, 252, 0.15), rgba(147, 230, 250, 0.18), rgba(147, 197, 253, 0.12), rgba(219, 234, 254, 0.06), transparent 60%)`,
              filter: "blur(1px)",
            }}
          />
        )}

        {/* Dark mode cursor-following hover effect */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 hidden dark:block"
            style={{
              background: `radial-gradient(800px 600px ellipse at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 230, 0, 0.26), rgba(214, 218, 8, 0.1), rgba(217, 248, 9, 0.05), transparent 60%)`,
              filter: "blur(1px)",
            }}
          />
        )}

        <div className="p-8 flex flex-col h-full relative z-10 min-h-[260px]">
          <div className="mb-3">
            {icon && <div className="text-3xl mb-3">{icon}</div>}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-left mb-3">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed text-left mb-auto">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech, index) => (
              <TechBadge key={index}>{tech}</TechBadge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
