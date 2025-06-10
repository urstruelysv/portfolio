import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import MDXLayout from "@/components/MDXLayout";
import MDXContent from "@/components/MDXContent";
import { getFileBySlug } from "@/lib/mdx";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import "./mdx-styles.css";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const { slug } = await props.params;
    const snippet = await getFileBySlug("snippets", slug);
    if (!snippet) {
      return {
        title: "Snippet Not Found - Sai Vamshi",
        description: "The requested snippet could not be found.",
      };
    }
    return {
      title: `${snippet.frontmatter.title} - Sai Vamshi`,
      description: snippet.frontmatter.description,
    };
  } catch (error) {
    return {
      title: "Snippet Not Found - Sai Vamshi",
      description: "The requested snippet could not be found.",
    };
  }
}

export default async function SnippetPage(props: Props) {
  const { slug } = await props.params;
  try {
    const snippet = await getFileBySlug("snippets", slug);

    if (!snippet || !snippet.mdxSource) {
      notFound();
    }

    return (
      <>
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Container>
            <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
              <div className="w-full">
                <MDXLayout>
                  <MDXContent source={snippet.mdxSource} />
                </MDXLayout>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error(`Error rendering snippet ${slug}:`, error);
    notFound();
  }
}
