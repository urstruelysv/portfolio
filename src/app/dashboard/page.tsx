import DashboardClient from "./DashboardClient";
import { requireAuthForPage } from "@/lib/auth";
import { listBlogs, listSnippets, listResources, getResumeAdmin } from "./actions";
import { resumeDefaults } from "@/data/resume";

export default async function DashboardPage() {
  await requireAuthForPage("/dashboard");
  const [blogs, snippets, resources] = await Promise.all([
    listBlogs(),
    listSnippets(),
    listResources(),
  ]);
  let resume = resumeDefaults;
  try {
    const dbResume = await getResumeAdmin();
    resume = {
      title: dbResume.title,
      subtitle: dbResume.subtitle,
      summary: dbResume.summary,
      fileUrl: dbResume.fileUrl,
      downloadName: dbResume.downloadName,
    };
  } catch {
    // use defaults
  }
  return <DashboardClient blogs={blogs} snippets={snippets} resources={resources} resume={resume} />;
}
