"use server";

import fs from "fs/promises";
import path from "path";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  description: z.string().min(1),
  date: z.string(),
  content: z.string().min(1),
});

export async function createBlogPost(data: z.infer<typeof blogSchema>) {
  const result = blogSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid blog data");
  }

  const { title, slug, description, date, content } = result.data;

  const mdxContent = `---
title: "${title}"
description: "${description}"
date: "${date}"
author: "Sai Vamshi"
---

${content}
`;

  const filePath = path.join(process.cwd(), "src/data/blogs", `${slug}.mdx`);

  try {
    await fs.writeFile(filePath, mdxContent, "utf8");
    return { success: true };
  } catch (error) {
    console.error("Failed to save blog post:", error);
    throw new Error("Failed to save blog post");
  }
}
