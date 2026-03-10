import DashboardClient from "./DashboardClient";
import { requireAuthForPage } from "@/lib/auth";
import { listBlogs, listSnippets } from "./actions";

export default async function DashboardPage() {
  await requireAuthForPage("/dashboard");
  const [blogs, snippets] = await Promise.all([listBlogs(), listSnippets()]);
  return <DashboardClient blogs={blogs} snippets={snippets} />;
}
