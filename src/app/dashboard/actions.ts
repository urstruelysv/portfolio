"use server";

import { z } from "zod";
import { requireAuthForAction } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { compile } from "@mdx-js/mdx";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

async function compileMdx(raw: string) {
  const compiled = await compile(raw, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  });
  return String(compiled);
}

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  content: z.string().min(1),
});

export async function createBlogPost(data: z.infer<typeof blogSchema>) {
  await requireAuthForAction();
  const result = blogSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }

  const { title, description, date, content } = result.data;
  const slug = result.data.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { success: false, error: "Invalid slug format" };
  }
  try {
    const compiled = await compileMdx(content);
    await prisma.blog.create({
      data: {
        title,
        slug,
        description,
        rawContent: content,
        content: compiled,
        publishedAt: new Date(date),
      },
    });
    return { success: true };
  } catch (error) {
    const message =
      error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "P2002"
        ? "Slug already exists"
        : "Failed to save blog post";
    console.error("Failed to save blog post:", error);
    return { success: false, error: message };
  }
}

const snippetSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().optional(),
  content: z.string().min(1),
});

export async function createSnippet(data: z.infer<typeof snippetSchema>) {
  await requireAuthForAction();
  const result = snippetSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }

  const { title, description, logo, content } = result.data;
  const slug = result.data.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { success: false, error: "Invalid slug format" };
  }
  try {
    const compiled = await compileMdx(content);
    await prisma.snippet.create({
      data: {
        title,
        slug,
        description,
        logo: logo || null,
        rawContent: content,
        content: compiled,
      },
    });
    return { success: true };
  } catch (error) {
    const message =
      error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "P2002"
        ? "Slug already exists"
        : "Failed to save snippet";
    console.error("Failed to save snippet:", error);
    return { success: false, error: message };
  }
}

export async function listBlogs() {
  await requireAuthForAction();
  const items = await prisma.blog.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.publishedAt.toISOString().split("T")[0],
    author: item.author,
  }));
}

export async function listSnippets() {
  await requireAuthForAction();
  const items = await prisma.snippet.findMany({
    orderBy: { createdAt: "desc" },
  });
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    logo: item.logo ?? "",
  }));
}

export async function getBlog(id: string) {
  await requireAuthForAction();
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) throw new Error("Blog not found");
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    description: blog.description,
    date: blog.publishedAt.toISOString().split("T")[0],
    author: blog.author,
    content: blog.rawContent,
  };
}

export async function getSnippet(id: string) {
  await requireAuthForAction();
  const snippet = await prisma.snippet.findUnique({ where: { id } });
  if (!snippet) throw new Error("Snippet not found");
  return {
    id: snippet.id,
    slug: snippet.slug,
    title: snippet.title,
    description: snippet.description,
    logo: snippet.logo ?? "",
    content: snippet.rawContent,
  };
}

const updateBlogSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  content: z.string().min(1),
});

export async function updateBlogPost(data: z.infer<typeof updateBlogSchema>) {
  await requireAuthForAction();
  const result = updateBlogSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }

  const { id, title, description, date, content } = result.data;
  const slug = result.data.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { success: false, error: "Invalid slug format" };
  }
  try {
    const compiled = await compileMdx(content);
    await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        rawContent: content,
        content: compiled,
        publishedAt: new Date(date),
      },
    });
    return { success: true };
  } catch (error) {
    const message =
      error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "P2002"
        ? "Slug already exists"
        : "Failed to update blog post";
    console.error("Failed to update blog post:", error);
    return { success: false, error: message };
  }
}

const updateSnippetSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().optional(),
  content: z.string().min(1),
});

export async function updateSnippet(data: z.infer<typeof updateSnippetSchema>) {
  await requireAuthForAction();
  const result = updateSnippetSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }

  const { id, title, description, logo, content } = result.data;
  const slug = result.data.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { success: false, error: "Invalid slug format" };
  }
  try {
    const compiled = await compileMdx(content);
    await prisma.snippet.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        logo: logo || null,
        rawContent: content,
        content: compiled,
      },
    });
    return { success: true };
  } catch (error) {
    const message =
      error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "P2002"
        ? "Slug already exists"
        : "Failed to update snippet";
    console.error("Failed to update snippet:", error);
    return { success: false, error: message };
  }
}
