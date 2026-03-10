"use client";

import { useEffect, useState } from "react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setData({ isPlaying: false });
      return;
    }
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/now-playing");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching now playing:", error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 mb-8 flex items-center justify-center w-full">
      <div className="flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full transition-all duration-300">
        <svg
          viewBox="0 0 168 168"
          className={`w-5 h-5 ${data?.isPlaying ? "text-[#1DB954]" : "text-zinc-400"}`}
          fill="currentColor"
        >
          <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.742-83.744-83.742zm38.403 120.775c-1.488 2.447-4.693 3.213-7.139 1.727-19.123-11.69-43.191-14.336-71.532-7.846-2.81.64-5.601-1.12-6.237-3.932-.642-2.812 1.115-5.601 3.927-6.237 31.066-7.114 57.653-4.033 79.255 9.147 2.445 1.486 3.212 4.692 1.726 7.141zm10.269-22.791c-1.874 3.048-5.83 4.011-8.879 2.136-21.894-13.458-55.27-17.355-81.16-9.501-3.414 1.034-7.005-1.042-8.04-4.456-.867-2.844 1.05-5.885 3.917-6.936 29.837-9.057 66.697-4.689 91.879 10.8 3.048 1.874 4.011 5.83 2.136 8.879zM123.11 75.308c-26.251-15.588-69.608-17.03-94.755-9.398-4.027 1.22-8.298-1.011-9.517-5.037-1.219-4.028 1.012-8.298 5.037-9.517 28.789-8.736 76.671-6.948 107.03 11.082 3.623 2.149 4.814 6.815 2.665 10.439-2.148 3.624-6.815 4.814-10.439 2.665z" />
        </svg>

        <div className="flex items-center gap-2 text-sm">
          {data?.isPlaying ? (
            <>
              <span className="text-zinc-500 dark:text-zinc-400">
                Now listening to
              </span>
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-black dark:text-white hover:underline truncate max-w-[150px] md:max-w-[300px]"
              >
                {data.title}
              </a>
              <span className="text-zinc-400 dark:text-zinc-500">by</span>
              <span className="font-medium text-black dark:text-white truncate max-w-[100px]">
                {data.artist}
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                Not Playing
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">—</span>
              <span className="text-zinc-500 dark:text-zinc-400">Spotify</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
