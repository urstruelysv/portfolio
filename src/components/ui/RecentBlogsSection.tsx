"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  title: string;
  views: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
    {
      title: "Building Modern UIs with Tailwind CSS",
      views: "3.1k views",
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 py-12"
    >
      <h2 className="text-3xl font-bold text-gray-900">Recent Blogs</h2>

      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
          >
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
                    {post.title}
                  </h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {post.views}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
