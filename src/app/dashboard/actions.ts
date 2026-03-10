"use server";

import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { requireAuthForAction } from "@/lib/auth";

const BLOGS_DIR = path.join(process.cwd(), "src/data/blogs");
const SNIPPETS_DIR = path.join(process.cwd(), "src/data/snippets");

function parseFrontmatter(source: string) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return { data: {}, content: source };
  const block = match[1];
  const data: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("\"") && value.endsWith("\"")) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  const content = source.slice(match[0].length);
  return { data, content };
}

function buildBlogMdx(input: {
  title: string;
  description: string;
  date: string;
  content: string;
  author?: string;
}) {
  const author = input.author ?? "Sai Vamshi";
  return `---\ntitle: "${input.title}"\ndescription: "${input.description}"\ndate: "${input.date}"\nauthor: "${author}"\n---\n\n${input.content}\n`;
}

function buildSnippetMdx(input: {
  title: string;
  description: string;
  logo?: string;
  content: string;
}) {
  const logoLine = input.logo ? `logo: "${input.logo}"\n` : "";
  return `---\ntitle: "${input.title}"\ndescription: "${input.description}"\n${logoLine}---\n\n${input.content}\n`;
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

  const mdxContent = buildBlogMdx({ title, description, date, content });
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);

  try {
    await fs.writeFile(filePath, mdxContent, "utf8");
    return { success: true };
  } catch (error) {
    console.error("Failed to save blog post:", error);
    return { success: false, error: "Failed to save blog post" };
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

  const mdxContent = buildSnippetMdx({ title, description, logo, content });
  const filePath = path.join(SNIPPETS_DIR, `${slug}.mdx`);

  try {
    await fs.writeFile(filePath, mdxContent, "utf8");
    return { success: true };
  } catch (error) {
    console.error("Failed to save snippet:", error);
    return { success: false, error: "Failed to save snippet" };
  }
}

export async function listBlogs() {
  await requireAuthForAction();
  const entries = await fs.readdir(BLOGS_DIR);
  const items = await Promise.all(
    entries
      .filter((name) => name.endsWith(".mdx"))
      .map(async (name) => {
        const slug = name.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(BLOGS_DIR, name), "utf8");
        const { data } = parseFrontmatter(raw);
        return {
          slug,
          title: data.title ?? slug,
          description: data.description ?? "",
          date: data.date ?? "",
          author: data.author ?? "Sai Vamshi",
        };
      }),
  );
  return items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function listSnippets() {
  await requireAuthForAction();
  const entries = await fs.readdir(SNIPPETS_DIR);
  const items = await Promise.all(
    entries
      .filter((name) => name.endsWith(".mdx"))
      .map(async (name) => {
        const slug = name.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(SNIPPETS_DIR, name), "utf8");
        const { data } = parseFrontmatter(raw);
        return {
          slug,
          title: data.title ?? slug,
          description: data.description ?? "",
          logo: data.logo ?? "",
        };
      }),
  );
  return items;
}

export async function getBlog(slug: string) {
  await requireAuthForAction();
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Sai Vamshi",
    content,
  };
}

export async function getSnippet(slug: string) {
  await requireAuthForAction();
  const filePath = path.join(SNIPPETS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    logo: data.logo ?? "",
    content,
  };
}

const updateBlogSchema = z.object({
  originalSlug: z.string().min(1),
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

  const { originalSlug, title, description, date, content } = result.data;
  const slug = result.data.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { success: false, error: "Invalid slug format" };
  }

  const mdxContent = buildBlogMdx({ title, description, date, content });
  const oldPath = path.join(BLOGS_DIR, `${originalSlug}.mdx`);
  const newPath = path.join(BLOGS_DIR, `${slug}.mdx`);

  try {
    await fs.writeFile(newPath, mdxContent, "utf8");
    if (originalSlug !== slug) {
      await fs.unlink(oldPath);
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}

const updateSnippetSchema = z.object({
  originalSlug: z.string().min(1),
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

  const { originalSlug, title, description, logo, content } = result.data;
  const slug = result.data.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { success: false, error: "Invalid slug format" };
  }

  const mdxContent = buildSnippetMdx({ title, description, logo, content });
  const oldPath = path.join(SNIPPETS_DIR, `${originalSlug}.mdx`);
  const newPath = path.join(SNIPPETS_DIR, `${slug}.mdx`);

  try {
    await fs.writeFile(newPath, mdxContent, "utf8");
    if (originalSlug !== slug) {
      await fs.unlink(oldPath);
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update snippet:", error);
    return { success: false, error: "Failed to update snippet" };
  }
}
