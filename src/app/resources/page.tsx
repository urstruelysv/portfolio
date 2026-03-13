import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import ResourcesCard from "../../components/ResourcesCard";
import type { Metadata } from "next";
import { getAllResources } from "@/lib/content";
import { resourceSeeds } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources – Sai Vamshi Gannoju",
  description:
    "Helpful websites that I've been using for years that have helped me in developing applications and much more",
};

export const dynamic = "force-dynamic";

type ResourceItem = {
  title: string;
  link: string;
  websiteLink: string;
  description: string;
  category: string;
  sortOrder: number;
};

function groupByCategory(items: ResourceItem[]) {
  const map = new Map<string, ResourceItem[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return Array.from(map.entries()).map(([category, list]) => ({
    category,
    items: list.sort((a, b) => a.sortOrder - b.sortOrder),
  }));
}

export default async function ResourcesPage() {
  const dbResources = await getAllResources();
  const resources: ResourceItem[] = dbResources.length
    ? dbResources.map((r) => ({
        title: r.title,
        link: r.link,
        websiteLink: r.websiteLink,
        description: r.description,
        category: r.category,
        sortOrder: r.sortOrder,
      }))
    : resourceSeeds;
  const groups = groupByCategory(resources);

  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Container>
          <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 mt-4 text-black dark:text-white">
              Resources
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Helpful{" "}
              <span className="bg-gray-100 border rounded-md px-1 py-0.5 tracking-tight dark:text-gray-300 dark:bg-gray-700">
                websites
              </span>{" "}
              that I've been using for years that have helped me in developing
              applications and much more. 🔥
            </p>

            {groups.map((group) => (
              <div key={group.category}>
                <h2 className="font-bold text-xl md:text-2xl tracking-tight mt-8 text-black dark:text-white border-b-4 border-green-300">
                  {group.category}
                </h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4">
                  {group.items.map((resource) => (
                    <ResourcesCard
                      key={`${group.category}-${resource.title}`}
                      title={resource.title}
                      link={resource.link}
                      websiteLink={resource.websiteLink}
                      description={resource.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
