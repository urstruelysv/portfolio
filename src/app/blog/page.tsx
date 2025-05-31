import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import BlogCard from "@/components/BlogCard";
import { getAllFilesFrontMatter, FrontMatter } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Sai Vamshi",
  description:
    "Thoughts, stories, and ideas about software development and technology.",
};

export default async function BlogPage() {
  const posts: FrontMatter[] = await getAllFilesFrontMatter("blogs");

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Thoughts, stories, and ideas about software development and
              technology.
            </p>
            <div className="grid gap-6 grid-cols-1 w-full">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title || "Untitled"}
                  slug={post.slug}
                  description={post.description || "No description available"}
                  date={post.date || new Date().toISOString()}
                  author={post.author || "Sai Vamshi"}
                />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
