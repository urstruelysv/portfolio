import { prisma } from "@/lib/prisma";

export async function getAllBlogs() {
  return prisma.blog.findMany({
    orderBy: { publishedAt: "desc" },
  });
}

export async function getRecentBlogs(limit = 2) {
  return prisma.blog.findMany({
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: { slug },
  });
}

export async function getAllSnippets() {
  return prisma.snippet.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSnippetBySlug(slug: string) {
  return prisma.snippet.findUnique({
    where: { slug },
  });
}

export async function getAllResources() {
  const resourceClient = (prisma as unknown as { resource?: typeof prisma.resource }).resource;
  if (!resourceClient) return [];
  return resourceClient.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { title: "asc" }],
  });
}

export async function getResume() {
  const resumeClient = (prisma as unknown as { resume?: typeof prisma.resume }).resume;
  if (!resumeClient) return null;
  return resumeClient.findFirst({
    orderBy: { updatedAt: "desc" },
  });
}
