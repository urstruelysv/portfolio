import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { getFileBySlug, getAllFilesFrontMatter } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getFileBySlug("blogs", params.slug);
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.frontmatter.title} - Blog`,
    description: post.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllFilesFrontMatter("blogs");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const post = await getFileBySlug("blogs", params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {post.frontmatter.title || "Untitled"}
            </h1>
            <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
              <div className="flex items-center">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {post.frontmatter.author || "Sai Vamshi"}
                </p>
                <span className="mx-2 text-gray-500">•</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {post.frontmatter.date
                    ? format(new Date(post.frontmatter.date), "MMMM d, yyyy")
                    : format(new Date(), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="prose dark:prose-dark w-full mt-8">
              <MDXRemote source={post.mdxSource} />
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
