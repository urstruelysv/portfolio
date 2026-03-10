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

export async function deleteBlog(id: string) {
  await requireAuthForAction();
  try {
    await prisma.blog.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return { success: false, error: "Failed to delete blog post" };
  }
}

export async function deleteSnippet(id: string) {
  await requireAuthForAction();
  try {
    await prisma.snippet.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete snippet:", error);
    return { success: false, error: "Failed to delete snippet" };
  }
}

const resourceSchema = z.object({
  title: z.string().min(1),
  link: z.string().url(),
  websiteLink: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  sortOrder: z.number().int().min(0),
});

export async function listResources() {
  await requireAuthForAction();
  const resourceClient = (prisma as unknown as { resource?: typeof prisma.resource }).resource;
  if (!resourceClient) {
    console.warn("Prisma client missing Resource model. Run prisma generate.");
    return [];
  }
  return resourceClient.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { title: "asc" }],
  });
}

export async function getResource(id: string) {
  await requireAuthForAction();
  const resourceClient = (prisma as unknown as { resource?: typeof prisma.resource }).resource;
  if (!resourceClient) throw new Error("Resource model not available. Run prisma generate.");
  const resource = await resourceClient.findUnique({ where: { id } });
  if (!resource) throw new Error("Resource not found");
  return resource;
}

export async function createResource(data: z.infer<typeof resourceSchema>) {
  await requireAuthForAction();
  const result = resourceSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }
  try {
    const resourceClient = (prisma as unknown as { resource?: typeof prisma.resource }).resource;
    if (!resourceClient) return { success: false, error: "Resource model not available. Run prisma generate." };
    await resourceClient.create({ data: result.data });
    return { success: true };
  } catch (error) {
    console.error("Failed to create resource:", error);
    return { success: false, error: "Failed to create resource" };
  }
}

const updateResourceSchema = resourceSchema.extend({
  id: z.string().min(1),
});

export async function updateResource(data: z.infer<typeof updateResourceSchema>) {
  await requireAuthForAction();
  const result = updateResourceSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }
  const { id, ...rest } = result.data;
  try {
    const resourceClient = (prisma as unknown as { resource?: typeof prisma.resource }).resource;
    if (!resourceClient) return { success: false, error: "Resource model not available. Run prisma generate." };
    await resourceClient.update({ where: { id }, data: rest });
    return { success: true };
  } catch (error) {
    console.error("Failed to update resource:", error);
    return { success: false, error: "Failed to update resource" };
  }
}

export async function deleteResource(id: string) {
  await requireAuthForAction();
  try {
    const resourceClient = (prisma as unknown as { resource?: typeof prisma.resource }).resource;
    if (!resourceClient) return { success: false, error: "Resource model not available. Run prisma generate." };
    await resourceClient.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return { success: false, error: "Failed to delete resource" };
  }
}

const resumeSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  summary: z.string().min(1),
  fileUrl: z.string().min(1),
  downloadName: z.string().min(1),
});

export async function getResumeAdmin() {
  await requireAuthForAction();
  const resumeClient = (prisma as unknown as { resume?: typeof prisma.resume }).resume;
  if (!resumeClient) throw new Error("Resume model not available. Run prisma generate.");
  const resume = await resumeClient.findFirst({ orderBy: { updatedAt: "desc" } });
  if (!resume) throw new Error("Resume not found");
  return resume;
}

export async function updateResume(data: z.infer<typeof resumeSchema>) {
  await requireAuthForAction();
  const result = resumeSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }
  try {
    const resumeClient = (prisma as unknown as { resume?: typeof prisma.resume }).resume;
    if (!resumeClient) return { success: false, error: "Resume model not available. Run prisma generate." };
    const existing = await resumeClient.findFirst();
    if (!existing) {
      await resumeClient.create({ data: result.data });
    } else {
      await resumeClient.update({ where: { id: existing.id }, data: result.data });
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update resume:", error);
    return { success: false, error: "Failed to update resume" };
  }
}
