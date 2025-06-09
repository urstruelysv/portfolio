import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import UpcomingProjects from "@/components/UpcomingProjects";
import RecentBlogs from "@/components/ui/RecentBlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 ">
        <HeroSection />

        <ProjectsSection />
        <UpcomingProjects />
        <ContactSection />
        <RecentBlogs />
      </main>
      <Footer />
    </>
  );
}
