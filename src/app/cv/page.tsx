"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";

export default function Resume() {
  const handleDownload = () => {
    const resumeUrl = "/CV.pdf"; // Public path
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Full_Stack_Developer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Full Stack Developer with DevOps expertise.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Experienced in building scalable applications and managing cloud
          infrastructure.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Resume Preview */}
          <div className="w-full md:w-1/2 border rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
              <iframe
                src="/CV.pdf#view=FitH"
                title="Resume Preview"
                className="w-full h-72 md:h-96"
              />
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center md:w-1/2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl mt-6 md:mt-0"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
