"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/snippets", label: "Snippets" },
  { href: "/resources", label: "Resources" },
  { href: "/cv", label: "CV" },
  { href: "https://github.com/urstruelysv", label: "GitHub" },
  { href: "https://www.linkedin.com/in/saivamshi-gannoju/", label: "LinkedIn" },
  { href: "https://x.com/SaiVamshi_DevOp", label: "Twitter" },
  { href: "https://instagram.com/urstruelysv", label: "Instagram" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
      {/* Grid of footer links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {footerLinks.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
          <div key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          </div>
        )})}
      </div>

    
    </footer>
  );
}
