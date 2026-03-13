import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import Container from "@/components/Container";
import { getResume } from "@/lib/content";
import { resumeDefaults } from "@/data/resume";

export const dynamic = "force-dynamic";

export default async function Resume() {
  const resume = (await getResume()) ?? resumeDefaults;
  const resumeContent = {
    name: "Sai Vamshi Gannoju",
    role: "Full-Stack Developer | Software Engineer",
    contact: [
      { label: "Email", value: "saivamshig404@gmail.com" },
      { label: "Phone", value: "+91-7286885570" },
      { label: "Location", value: "Hyderabad, India" },
      { label: "GitHub", value: "github.com/urstruelysv" },
      { label: "Website", value: "saivamshi.aethoscompany.in" },
    ],
    summary:
      "Experienced Full-Stack Developer with expertise in building scalable web applications and SaaS platforms. Proven track record of delivering end-to-end solutions using modern JavaScript frameworks, cloud technologies, and DevOps practices. Strong background in leading technical teams and driving innovation in startup environments.",
    skills: {
      frontend: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "TailwindCSS",
        "Responsive Design",
        "Redux",
      ],
      backend: [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "GraphQL",
        "Microservices Architecture",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
      ],
      cloudDevOps: [
        "AWS (EC2, S3, Lambda)",
        "Docker",
        "GitHub Actions",
        "CI/CD Pipelines",
        "Vercel",
        "Heroku",
        "Linux",
      ],
      tools: [
        "Git",
        "Stripe Payments",
        "Auth0",
        "OpenAI API",
        "Agile/Scrum",
        "Jira",
        "Postman",
        "Jest",
        "Webpack",
      ],
    },
    experience: [
      {
        title: "Founder & Lead Developer",
        date: "2024 - Present",
        org: "Aethos Labs, Hyderabad",
        highlights: [
          "Founded and developed AI-powered SaaS platform serving 500+ users with 99.9% uptime.",
          "Architected scalable infrastructure using Next.js, MongoDB, and Auth0 authentication.",
          "Implemented secure payment processing with Stripe, generating $15K+ monthly revenue.",
          "Led product development from concept to market launch in 6 months.",
        ],
      },
      {
        title: "Senior Full-Stack Developer",
        date: "2019 - 2024",
        org: "Freelance Developer, Remote",
        highlights: [
          "Delivered 15+ production-ready web applications for clients across e-commerce, SaaS, and enterprise sectors.",
          "Reduced client deployment time by 60% through Docker containerization and AWS infrastructure.",
          "Built high-performance e-commerce platform handling 10K+ concurrent users with 2-second load times.",
          "Integrated third-party APIs (Stripe, OpenAI, social media) to enhance application functionality.",
          "Mentored junior developers and established coding standards for consistent code quality.",
        ],
      },
      {
        title: "Technical Lead",
        date: "2020 - 2022",
        org: "College Innovation & Technical Group, JNTU Hyderabad",
        highlights: [
          "Led team of 40+ students in organizing technical events and hackathons.",
          "Established R&D labs focusing on emerging technologies and innovation projects.",
          "Coordinated with industry professionals for tech talks and workshops.",
        ],
      },
    ],
    projects: [
      {
        name: "Cirro E-commerce Platform",
        link: "cirrowtr.in",
        summary:
          "Developed comprehensive e-commerce solution with advanced inventory management, real-time analytics, and mobile-responsive design. Implemented secure payment gateway and automated order processing.",
        stack: "Next.js, MongoDB, Docker, AWS, Stripe Integration",
      },
      {
        name: "EchoBoard - Privacy-Focused Commenting System",
        link: "echoboard-beta.vercel.app",
        summary:
          "Built embeddable commenting widget with AI-powered moderation, end-to-end encryption, and subscription-based monetization model. Features real-time updates and spam protection.",
        stack: "Next.js, OpenAI API, Stripe, WebSocket, Encryption",
      },
      {
        name: "DownloadAnything - File Downloader Application",
        link: "downloadanything.vercel.app",
        summary:
          "Built high-performance file downloading application with support for multiple formats and protocols. Features progress tracking, resume capability, and batch downloads with optimized API integrations.",
        stack: "Next.js, REST APIs, File System APIs, Progressive Web App",
      },
      {
        name: "The Whole Truth Foods E-commerce",
        link: "thewholetruthfoods.com",
        summary:
          "Developed full-stack e-commerce platform with inventory management, order tracking, and customer analytics. Implemented SEO optimization resulting in 40% increase in organic traffic.",
        stack: "React.js, Node.js, MongoDB, Payment Gateway Integration",
      },
    ],
    education: [
      {
        title: "Bachelor of Technology - Computer Science & Engineering",
        org: "Jawaharlal Nehru Technological University, Hyderabad",
        date: "2018 - 2022",
        detail:
          "Relevant Coursework: Data Structures, Algorithms, Database Management, Software Engineering",
      },
      {
        title: "Intermediate (Mathematics, Physics, Chemistry)",
        org: "Sri Gayatri Junior College",
        date: "2016 - 2018",
      },
    ],
    certifications: [
      "AWS Certified Solutions Architect - Associate (In Progress)",
      "MongoDB Certified Developer",
      "Google Cloud Platform Fundamentals",
      "Advanced React Development Patterns",
    ],
    achievements: [
      "Successfully launched 3 SaaS products with combined user base of 1000+ active users.",
      "Reduced infrastructure costs by 45% through optimization and containerization.",
      "Led technical team that won 2nd place in inter-college hackathon (2021).",
      "Established development best practices resulting in 30% reduction in bug reports.",
      "Contributed to open-source projects with 200+ GitHub stars.",
      "Active volunteer with Swamy Vivekananda Seva Samithi (SVSS), contributing to community service and social welfare initiatives.",
    ],
    languages: [
      "English: Fluent (Professional Working Proficiency)",
      "Hindi: Native Speaker",
      "Telugu: Native Speaker",
    ],
    additional: [
      "Available for immediate joining and open to relocation.",
      "Experience working with remote teams across different time zones.",
      "Strong understanding of Agile development methodologies and DevOps practices.",
      "Passionate about emerging technologies: AI/ML, Blockchain, and Cloud Computing.",
    ],
  };
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <Container>
          <div className="space-y-3">
            <h1 className="font-bold text-3xl md:text-5xl text-gray-900 dark:text-white">
              {resumeContent.name}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {resumeContent.role}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
              {resumeContent.contact.map((item) => (
                <span key={item.label}>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.label}:
                  </span>{" "}
                  {item.value}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {resumeContent.summary}
            </p>
          </div>

          <div className="mt-10 grid gap-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Technical Skills
              </h2>
              <div className="grid gap-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Frontend:
                  </span>{" "}
                  {resumeContent.skills.frontend.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Backend:
                  </span>{" "}
                  {resumeContent.skills.backend.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Cloud & DevOps:
                  </span>{" "}
                  {resumeContent.skills.cloudDevOps.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Tools & Integrations:
                  </span>{" "}
                  {resumeContent.skills.tools.join(", ")}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Professional Experience
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                {resumeContent.experience.map((role) => (
                  <div key={role.title}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {role.title}
                      </h3>
                      <span className="text-sm">{role.date}</span>
                    </div>
                    <p className="text-sm">{role.org}</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                      {role.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Key Projects
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                {resumeContent.projects.map((project) => (
                  <div key={project.name}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.link}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{project.summary}</p>
                    <p className="text-sm mt-1">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Tech Stack:
                      </span>{" "}
                      {project.stack}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Education
              </h2>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {resumeContent.education.map((item) => (
                  <div key={item.title}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span>{item.date}</span>
                    </div>
                    <p>{item.org}</p>
                    {item.detail && <p>{item.detail}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Certifications & Learning
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {resumeContent.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Key Achievements
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {resumeContent.achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Languages
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {resumeContent.languages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Additional Information
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {resumeContent.additional.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

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
