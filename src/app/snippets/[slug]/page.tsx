import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { snippets } from "#site/content";
import { MDXContent } from "@/components/MDXContent";

interface Props {
  params: Promise<{
    slug: string;
  }>;
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

  if (!snippet) notFound();

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <div className="w-full">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <MDXContent code={snippet.content} />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}