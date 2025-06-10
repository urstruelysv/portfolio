"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface BlogPost {
  title: string;
  views: string;
}

export default function RecentBlogs() {
  // Sample blog posts data - replace with your actual data source
  const blogPosts: BlogPost[] = [
    {
      title: "Getting Started with Next.js",
      views: "1.2k views",
    },
    {
      title: "Understanding TypeScript",
      views: "2.5k views",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <div className="space-y-6">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-2 text-black dark:text-white">
          Recent Blogs
        </h2>

        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <div key={index} className="cursor-pointer">
              <Card className="border border-gray-200 dark:border-zinc-800 hover:shadow-md dark:hover:shadow-zinc-900/50 transition-all duration-300 bg-white dark:bg-zinc-900">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {post.views}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <Link
          href="/blogs"
          className="inline-block text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors"
        >
          See More →
        </Link>
      </div>
    </section>
  );
}
