import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { getBlogBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { format } from "date-fns";
import { MDXContent } from "@/components/MDXContent";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  await prisma.blog.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return format(new Date(), "MMMM d, yyyy");
    }
  };

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <p>{post.author}</p>
              <span className="mx-2 text-gray-500">•</span>
              <p>{formatDate(post.publishedAt.toISOString())}</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none w-full mt-8 blog-content">
              <MDXContent code={post.content} />
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
