import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { snippets } from "#site/content";
import { MDXContent } from "@/components/MDXContent";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function redirectLegacySlug(slug: string) {
  const filePath = path.join(process.cwd(), "src/data/snippets", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return;
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
    const targetSlug = data.slug?.trim() || slugifyTitle(data.title || "");
    if (targetSlug && targetSlug !== slug) {
      redirect(`/snippets/${targetSlug}`);
    }
  } catch {
    return;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const snippet = snippets.find((s) => s.slug === slug);

  if (!snippet) {
    return {
      title: "Snippet Not Found - Sai Vamshi",
      description: "The requested snippet could not be found.",
    };
  }
  return {
    title: `${snippet.title} - Sai Vamshi`,
    description: snippet.description,
  };
}

export function generateStaticParams() {
  return snippets.map((s) => ({
    slug: s.slug,
  }));
}

export default async function SnippetPage({ params }: Props) {
  const { slug } = await params;
  const snippet = snippets.find((s) => s.slug === slug);

  if (!snippet) {
    await redirectLegacySlug(slug);
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <div className="w-full">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">
                {snippet.title}
              </h1>
              <div className="prose prose-gray dark:prose-invert max-w-none snippet-content">
                <MDXContent code={snippet.content} enableCopy />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
