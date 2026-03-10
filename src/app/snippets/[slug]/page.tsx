import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { getSnippetBySlug } from "@/lib/content";
import { MDXContent } from "@/components/MDXContent";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);

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

export default async function SnippetPage({ params }: Props) {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);

  if (!snippet) notFound();

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
