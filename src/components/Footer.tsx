"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/links", label: "Links" },
  { href: "https://github.com/urstruelysv", label: "GitHub" },
  { href: "https://www.linkedin.com/in/saivamshi-gannoju/", label: "LinkedIn" },
  { href: "https://x.com/SaiVamshi_DevOp", label: "Twitter" },
  { href: "https://instagram.com/urstruelysv", label: "Instagram" },
  { href: "/freelancing", label: "Freelancing" },
  { href: "/snippets", label: "Snippets" },
  { href: "/tweets", label: "Tweets" },
  { href: "/resources", label: "Resources" },
  { href: "/demos", label: "Live Demos" },
  { href: "/freecodecamp", label: "freeCodeCamp" },
  { href: "/boxshadows", label: "Box Shadows" },
  { href: "/design-inspiration", label: "Design Inspiration" },
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
        {footerLinks.map((link, index) => (
          <div key={index}>
            <Link
              href={link.href}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom footer: social + credits */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="whitespace-nowrap">Find me on</span>
          <div className="flex gap-3">
            <Link
              href="https://twitter.com/SaiVamshi_DevOp"
              className="hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>

            <Link
              href="https://www.peerlist.io/SaiVamshi_Dev"
              className="hover:opacity-100 opacity-70 transition-opacity"
            >
              <div
                className="w-4 h-4"
                style={{
                  backgroundImage:
                    'url("https://ext.same-assets.com/1481338541/2033248178.png")',
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Link>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center md:text-right mt-3">
          <span>Portfolio inspired by </span>
          <Link
            href="https://leerob.io"
            className="hover:text-zinc-700 dark:hover:text-zinc-200 underline transition-colors"
          >
            Lee Rob
          </Link>
          <span> and </span>
          <Link
            href="https://www.aceternity.com/"
            className="hover:text-zinc-700 dark:hover:text-zinc-200 underline transition-colors"
          >
            Aceternity
          </Link>
        </div>
      </div>
    </footer>
  );
}
