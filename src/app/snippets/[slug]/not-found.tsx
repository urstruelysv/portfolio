import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              404 Snippet Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The snippet you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/snippets"
              className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white"
            >
              Return to Snippets
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
