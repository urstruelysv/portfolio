import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import Container from "@/components/Container";
import { getResume } from "@/lib/content";
import { resumeDefaults } from "@/data/resume";

export const dynamic = "force-dynamic";

export default async function Resume() {
  const resume = (await getResume()) ?? resumeDefaults;
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <Container>
          <h1 className="font-bold text-3xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            {resume.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {resume.subtitle}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {resume.summary}
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* Resume Preview */}
            <div className="w-full md:w-1/2 border rounded-lg shadow-lg overflow-hidden">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                <iframe
                  src={`${resume.fileUrl}#view=FitH`}
                  title="Resume Preview"
                  className="w-full h-72 md:h-96"
                />
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center md:w-1/2">
              <a
                href={resume.fileUrl}
                download={resume.downloadName}
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl mt-6 md:mt-0"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
