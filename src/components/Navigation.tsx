"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/snippets", label: "Snippets" },
  { href: "/blogs", label: "blogs" },
  { href: "/resources", label: "Resources" },
  { href: "/cv", label: "cv" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 max-w-4xl mx-auto pt-6 pb-4 mb-2">
        {/* Background + Blur */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/60 dark:bg-gray-950/40 dark:border-gray-800/40 rounded-xl pointer-events-none z-[-1]" />
        {/* Blurry Edges */}
        <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-white/60 dark:from-gray-950/40 to-transparent blur-md z-[-1]" />
        <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-white/60 dark:from-gray-950/40 to-transparent blur-md z-[-1]" />

        <ThemeToggle />

        <div className="relative">
          <div className="flex items-center space-x-1 bg-gray-50/80 dark:bg-gray-950/80 rounded-full px-2 py-1.5 border border-gray-200/50 dark:border-gray-800/50">
            {navLinks.map((link) => {
              // Only determine active state after hydration to prevent mismatch
              const isActive = isHydrated && pathname === link.href;

              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500
                      ${
                        isActive
                          ? "text-green-600 dark:text-green-400 bg-white/90 dark:bg-gray-700/80 shadow-sm border border-green-200/30 dark:border-green-500/20"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-700/40"
                      }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Spacer to push content below fixed navbar */}
      <div className="h-10" />
    </>
  );
}
