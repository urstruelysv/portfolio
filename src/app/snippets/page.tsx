import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import FunctionCard from "@/components/FunctionCard";
import { getAllFilesFrontMatter, FrontMatter } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippets - Sai Vamshi",
  description:
    "Reusable code snippets that contain API integrations, custom CSS or something I find cool.",
};

export default async function SnippetsPage() {
  const snippets: FrontMatter[] = await getAllFilesFrontMatter("snippets");

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Snippets
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Reusable{" "}
              <span className="bg-gray-100 border rounded-md px-1 py-0.5 tracking-tight dark:text-gray-300 dark:bg-gray-700">
                code snippets
              </span>{" "}
              that can be easily integrated in your application 🧩. The page
              contains functions and code snippets which can be used on your
              webpage.
            </p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 w-full">
              {snippets.map((snippet) => (
                <FunctionCard
                  key={snippet.slug}
                  title={snippet.title || "Untitled"}
                  slug={snippet.slug}
                  logo={snippet.logo}
                  description={
                    snippet.description || "No description available"
                  }
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
