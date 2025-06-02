"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-8">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-2 text-black dark:text-white">
          Want to hire me as a freelancer? Let's discuss.
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-base">
          Drop your message and let's discuss about your project.
        </p>

        <div className="flex flex-col space-y-6">
          <div className="flex justify-start">
            <Link
              href="https://wa.me/7286885570?text=I want to work on a project with you"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200">
                Chat on WhatsApp
              </Button>
            </Link>
          </div>

          {/* Horizontal separator line */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 my-6"></div>

          <div className="max-w-md">
            <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-base">
              Drop in your email ID and I will get back to you.
            </p>
            <form className="flex gap-3">
              <Input
                type="email"
                placeholder="saivamshig404@gmail.com"
                className="flex-1 rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                required
              />
              <Button type="submit" variant="default" className="rounded-lg">
                Send
              </Button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Spotify Status */}
      <div className="mt-8 text-center">
        <div className="flex items-center left px-4 gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Not Playing</span>
          <span className="font-medium">Spotify</span>
        </div>
      </div>
    </section>
  );
}
