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

// Metadata generator
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const post = await getFileBySlug("blogs", slug);

    if (!post) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: `${post.frontmatter.title} - Blog`,
      description: post.frontmatter.description || "Blog post",
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description || "Blog post",
        type: "article",
        publishedTime: post.frontmatter.date,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

// Static paths
export async function generateStaticParams() {
  try {
    const posts = await getAllFilesFrontMatter("blogs");
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Main component
export default async function BlogPost(props: Props) {
  const { slug } = await props.params;

  let post;
  try {
    post = await getFileBySlug("blogs", slug);
    if (!post) notFound();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  const formatDate = (dateString?: string) => {
    try {
      return format(new Date(dateString || ""), "MMMM d, yyyy");
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
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {post.frontmatter.title || "Untitled"}
            </h1>
            <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <p>{post.frontmatter.author || "Sai Vamshi"}</p>
                <span className="mx-2 text-gray-500">•</span>
                <p>{formatDate(post.frontmatter.date)}</p>
              </div>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none w-full mt-8 prose-headings:scroll-mt-20 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
              <MDXRemote
                source={post.mdxSource}
                options={{
                  parseFrontmatter: true,
                }}
              />
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
