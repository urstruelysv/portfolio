"use client";

export default function GitHubActivity() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <div className="rounded-2xl border border-emerald-200/60 dark:border-emerald-500/30 bg-zinc-50 dark:bg-zinc-900/60 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600/80 dark:text-emerald-400/80">
              Open Source
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white mt-2">
              GitHub Activity
            </h2>
          </div>
          <a
            href="https://github.com/urstruelysv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors"
          >
            github.com/urstruelysv
          </a>
        </div>

        <div className="mt-5 rounded-xl border border-emerald-200/60 dark:border-emerald-500/20 bg-white dark:bg-black p-4 overflow-hidden">
          <img
            src="https://ghchart.rshah.org/22c55e/urstruelysv"
            alt="GitHub contributions chart for urstruelysv"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
