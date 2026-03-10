import { prisma } from "../src/lib/prisma";

function hashSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function computeViews(slug: string, publishedAt: Date) {
  const now = Date.now();
  const days = Math.max(1, Math.floor((now - publishedAt.getTime()) / (1000 * 60 * 60 * 24)));
  const base = Math.min(8000, days * 12);
  const jitter = hashSlug(slug) % 200;
  return Math.max(50, base + jitter + 50);
}

async function main() {
  const posts = await prisma.blog.findMany();
  for (const post of posts) {
    if (post.views > 0) continue;
    const views = computeViews(post.slug, post.publishedAt);
    await prisma.blog.update({
      where: { id: post.id },
      data: { views },
    });
  }
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
