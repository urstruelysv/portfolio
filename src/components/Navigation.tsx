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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
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

        <div className="relative hidden md:block">
          <div className="flex items-center space-x-1 bg-gray-50/80 dark:bg-gray-950/80 rounded-full px-2 py-1.5 border border-gray-200/50 dark:border-gray-800/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

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
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-gray-50/80 dark:bg-gray-950/80 border border-gray-200/50 dark:border-gray-800/50 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="flex flex-col items-start justify-start h-full pt-24 px-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full p-4 rounded-lg text-left text-lg font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {/* Spacer to push content below fixed navbar */}
      <div className="h-10" />
    </>
  );
}
