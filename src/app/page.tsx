import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LifeChangelog from "@/components/LifeChangelog";
import Navigation from "@/components/Navigation";
import NowPlaying from "@/components/NowPlaying";
import ProjectsSection from "@/components/ProjectsSection";
import RecentBlogs from "@/components/RecentBlogs";
import GitHubActivity from "@/components/GitHubActivity";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 ">
        <HeroSection />
        <GitHubActivity />
        <RecentBlogs />
        <ProjectsSection />
        <LifeChangelog />
        <ContactSection />
        <NowPlaying />
      </main>
      <Footer />
    </>
  );
}
