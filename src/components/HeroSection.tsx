"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { BlurImage } from "./BlurImage";

const Hyperlink = ({ text, link }: { text: string; link: string }) => (
  <a
    href={link}
    className="text-blue-600 dark:text-blue-400 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    {text}
  </a>
);

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: "1vh" },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: "1vh" },
  };

  const itemA = {
    hidden: { opacity: 0, scale: 0.95, y: "1vh" },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section id="skip" className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:space-x-10 w-full mb-10">
        <div className="flex md:w-3/4 flex-col mt-6">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
            Sai Vamshi Gannoju
          </h1>

          <div className="relative leading-7 items-center flex-wrap text-zinc-800 dark:text-zinc-500 mb-5 text-base md:text-lg">
            Building
            <a
              className="inline-block px-2 py-0 font-bold bg-gray-100 dark:bg-zinc-700 dark:text-white mx-1 text-sm md:text-base rounded"
              href="https://www.aethoscompany.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aethos Labs
            </a>
            <a href="">,</a>
            <a
              className="inline-block px-2 py-0 font-bold bg-gray-100 dark:bg-zinc-700 dark:text-white mx-1 text-sm md:text-base rounded"
              href="https://cirrowtr.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cirro
            </a>
            other
            <span
              className="font-bold cursor-pointer text-zinc-800 dark:text-zinc-200 text-sm md:text-base"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              {" "}
              cool things
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="modal"
                    variants={variants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="z-20 p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-2xl absolute inset-x-0 w-full min-h-60 text-xs md:text-sm"
                  >
                    <div className="bg-grid-slate-50 dark:bg-grid-zinc-700/30 absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
                    <motion.p variants={itemA} className="font-normal py-3">
                      Founder{" "}
                      <a
                        href="https://aethoscompany.in/"
                        className="inline-block font-bold text-zinc-700 dark:text-zinc-200 hover:underline text-xs md:text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @aethos vison labs
                      </a>
                    </motion.p>
                    <motion.p variants={itemA} className="font-normal py-3">
                      Helping front-end developers{" "}
                      <a
                        href="https://magicui.com"
                        className="inline-block font-bold text-zinc-700 dark:text-zinc-200 hover:underline text-xs md:text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @magicUi
                      </a>{" "}
                    </motion.p>

                    <motion.p variants={itemA} className="font-normal py-3">
                      Blogs{" "}
                      <a
                        href="https://www.saivamshi.aethoscompany.in"
                        className="inline-block font-bold text-zinc-700 dark:text-zinc-200 hover:underline text-xs md:text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @saivamshi.in
                      </a>
                    </motion.p>
                    <motion.p variants={itemA} className="font-normal py-3">
                      snippets{" "}
                      <a
                        href="https://www.saivamshi.aethoscompany.in"
                        className="inline-block font-bold text-zinc-700 dark:text-zinc-200 hover:underline text-xs md:text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @saivamshi.in
                      </a>
                    </motion.p>
                    <div className="absolute inset-x-0 -bottom-px h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]">
                      <div className="w-full flex-none blur-[1px] h-px [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium">
            Full-stack developer crafting tasteful frontends, robust backends,
            and smooth DevOps—growing into system architecture for resilient
            end-to-end solutions.
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium mt-2">
            Here is my{" "}
            <a
              href="/cv"
              className="font-bold font-inter relative inline-flex overflow-hidden text-xs md:text-sm text-zinc-600/0.1 dark:text-zinc-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative">CV</span>
            </a>
            .
          </p>
        </div>
        <div className="relative flex-shrink-1 p-4 md:p-4 md:order-last order-first">
          <a
            href="https://twitter.com/mannupaaji"
            target="_blank"
            className="block z-[5] overflow-hidden rounded shadow-xl ring-1 ring-slate-900/5 relative bg-white h-20 w-20"
            rel="noopener noreferrer"
          >
            <BlurImage
              src="/Sv.png"
              alt="Sai Vamshi Gannoju"
              className="bg-gray-100 object-contain w-full h-full rounded"
              objectFit="cover"
            />
          </a>
          {/* Subtle grid/lines background */}
          <div className="z-0">
            <div className="absolute left-0 -right-12 top-0 h-px bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
            <div className="absolute -top-8 bottom-0 left-12 w-px bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
            <div className="absolute left-0 -right-12 bottom-14 h-px bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
            <div className="absolute right-0 -top-2 -bottom-8 w-px bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
            <div className="absolute bottom-full right-10 -mb-px flex h-8 items-end overflow-hidden">
              <div className="flex -mb-px h-[2px] w-40 -scale-x-100">
                <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
