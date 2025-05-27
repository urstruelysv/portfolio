import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
          Want to hire me as a freelancer? Let's discuss.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Drop your message and let's discuss about your project.
        </p>

        <div className="flex justify-center mb-8">
          <Link
            href="https://wa.me/7286885570?text=I want to work on a project with you"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
              Chat on WhatsApp
            </Button>
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
            Drop in your email ID and I will get back to you.
          </p>
          <form className="flex gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              className="flex-1"
              required
            />
            <Button type="submit" variant="default">
              Send
            </Button>
          </form>
        </div>
      </div>

      {/* Spotify Status */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Not Playing</span>
          <span className="font-medium">Spotify</span>
        </div>
      </div>
    </section>
  );
}
