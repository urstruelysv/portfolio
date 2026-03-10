import { readdir, readFile } from "fs/promises";
import path from "path";
import { compile } from "@mdx-js/mdx";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { prisma } from "../src/lib/prisma";
import { resourceSeeds } from "../src/data/resources";
import { resumeDefaults } from "../src/data/resume";

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

async function compileMdx(raw: string) {
  const compiled = await compile(raw, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  });
  return String(compiled);
}

async function seedBlogs() {
  const entries = await readdir(BLOGS_DIR);
  for (const name of entries.filter((n) => n.endsWith(".mdx"))) {
    const raw = await readFile(path.join(BLOGS_DIR, name), "utf8");
    const { data, content } = parseFrontmatter(raw);
    const slug =
      data.slug ||
      (data.title || name.replace(/\.mdx$/, ""))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const compiled = await compileMdx(content);
    await prisma.blog.upsert({
      where: { slug },
      create: {
        title: data.title ?? slug,
        slug,
        description: data.description ?? "",
        author: data.author ?? "Sai Vamshi",
        publishedAt: data.date ? new Date(data.date) : new Date(),
        rawContent: content,
        content: compiled,
      },
      update: {
        title: data.title ?? slug,
        description: data.description ?? "",
        author: data.author ?? "Sai Vamshi",
        publishedAt: data.date ? new Date(data.date) : new Date(),
        rawContent: content,
        content: compiled,
      },
    });
  }
}

async function seedSnippets() {
  const entries = await readdir(SNIPPETS_DIR);
  for (const name of entries.filter((n) => n.endsWith(".mdx"))) {
    const raw = await readFile(path.join(SNIPPETS_DIR, name), "utf8");
    const { data, content } = parseFrontmatter(raw);
    const slug =
      data.slug ||
      (data.title || name.replace(/\.mdx$/, ""))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const compiled = await compileMdx(content);
    await prisma.snippet.upsert({
      where: { slug },
      create: {
        title: data.title ?? slug,
        slug,
        description: data.description ?? "",
        logo: data.logo ?? null,
        rawContent: content,
        content: compiled,
      },
      update: {
        title: data.title ?? slug,
        description: data.description ?? "",
        logo: data.logo ?? null,
        rawContent: content,
        content: compiled,
      },
    });
  }
}

async function seedResources() {
  for (const resource of resourceSeeds) {
    await prisma.resource.upsert({
      where: { link: resource.link },
      create: resource,
      update: {
        title: resource.title,
        websiteLink: resource.websiteLink,
        description: resource.description,
        category: resource.category,
        sortOrder: resource.sortOrder,
      },
    });
  }
}

async function seedResume() {
  const existing = await prisma.resume.findFirst();
  if (existing) return;
  await prisma.resume.create({
    data: resumeDefaults,
  });
}

async function main() {
  await seedBlogs();
  await seedSnippets();
  await seedResources();
  await seedResume();
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
