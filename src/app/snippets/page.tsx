import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SnippetsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-20 py-8">
        <h1 className="text-3xl font-bold mb-4">Snippets</h1>
        <p className="text-gray-600">Code snippets will appear here soon.</p>
      </main>
      <Footer />
    </>
  );
}
