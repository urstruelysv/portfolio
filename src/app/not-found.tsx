"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function NotFound() {
  return (
    <>
      <Navigation />
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight mb-4 text-black dark:text-white">
            404
          </h1>
          <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
            Page Not Found
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
