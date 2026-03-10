"use client";

import { useMemo, useState, useTransition } from "react";
import {
  createBlogPost,
  createSnippet,
  deleteBlog,
  deleteSnippet,
  deleteResource,
  getBlog,
  getSnippet,
  getResource,
  listResources,
  updateResume,
  createResource,
  updateResource,
  updateBlogPost,
  updateSnippet,
} from "./actions";
import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

type SnippetListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  logo: string;
};

type ResourceItem = {
  id: string;
  title: string;
  link: string;
  websiteLink: string;
  description: string;
  category: string;
  sortOrder: number;
};

type ResumeState = {
  title: string;
  subtitle: string;
  summary: string;
  fileUrl: string;
  downloadName: string;
};

type BlogFormState = {
  mode: "create" | "edit";
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  content: string;
};

type SnippetFormState = {
  mode: "create" | "edit";
  id: string;
  title: string;
  slug: string;
  description: string;
  logo: string;
  content: string;
};

type ResourceFormState = {
  mode: "create" | "edit";
  id: string;
  title: string;
  link: string;
  websiteLink: string;
  description: string;
  category: string;
  sortOrder: number;
};

const emptyBlog = (): BlogFormState => ({
  mode: "create",
  id: "",
  title: "",
  slug: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  content: "",
});

const emptySnippet = (): SnippetFormState => ({
  mode: "create",
  id: "",
  title: "",
  slug: "",
  description: "",
  logo: "",
  content: "",
});

const emptyResource = (): ResourceFormState => ({
  mode: "create",
  id: "",
  title: "",
  link: "",
  websiteLink: "",
  description: "",
  category: "",
  sortOrder: 0,
});

interface Props {
  blogs: BlogListItem[];
  snippets: SnippetListItem[];
  resources: ResourceItem[];
  resume: ResumeState;
}

export default function DashboardClient({ blogs, snippets, resources, resume }: Props) {
  const [isPending, startTransition] = useTransition();
  const [blogItems, setBlogItems] = useState<BlogListItem[]>(blogs);
  const [snippetItems, setSnippetItems] = useState<SnippetListItem[]>(snippets);
  const [resourceItems, setResourceItems] = useState<ResourceItem[]>(resources);
  const [activeForm, setActiveForm] = useState<"blog" | "snippet" | "resources" | "cv">("blog");
  const [blogMessage, setBlogMessage] = useState("");
  const [snippetMessage, setSnippetMessage] = useState("");
  const [resourceMessage, setResourceMessage] = useState("");
  const [resumeMessage, setResumeMessage] = useState("");
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlog);
  const [snippetForm, setSnippetForm] = useState<SnippetFormState>(emptySnippet);
  const [resourceForm, setResourceForm] = useState<ResourceFormState>(emptyResource);
  const [resumeForm, setResumeForm] = useState<ResumeState>(resume);

  const sortedBlogs = useMemo(
    () => [...blogItems].sort((a, b) => (b.date || "").localeCompare(a.date || "")),
    [blogItems],
  );

  const sortedResources = useMemo(
    () =>
      [...resourceItems].sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return a.title.localeCompare(b.title);
      }),
    [resourceItems],
  );

  function setBlogField<K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) {
    setBlogForm((prev) => ({ ...prev, [key]: value }));
  }

  function setSnippetField<K extends keyof SnippetFormState>(key: K, value: SnippetFormState[K]) {
    setSnippetForm((prev) => ({ ...prev, [key]: value }));
  }

  function setResourceField<K extends keyof ResourceFormState>(key: K, value: ResourceFormState[K]) {
    setResourceForm((prev) => ({ ...prev, [key]: value }));
  }

  function setResumeField<K extends keyof ResumeState>(key: K, value: ResumeState[K]) {
    setResumeForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetBlogForm() {
    setBlogMessage("");
    setBlogForm(emptyBlog());
  }

  function resetSnippetForm() {
    setSnippetMessage("");
    setSnippetForm(emptySnippet());
  }

  function resetResourceForm() {
    setResourceMessage("");
    setResourceForm(emptyResource());
  }

  function handleEditBlog(id: string) {
    setBlogMessage("");
    startTransition(async () => {
      try {
        const data = await getBlog(id);
        setBlogForm({
          mode: "edit",
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          date: data.date || new Date().toISOString().split("T")[0],
          content: data.content,
        });
      } catch (error) {
        setBlogMessage("Error: " + (error as Error).message);
      }
    });
  }

  function handleEditSnippet(id: string) {
    setSnippetMessage("");
    startTransition(async () => {
      try {
        const data = await getSnippet(id);
        setSnippetForm({
          mode: "edit",
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          logo: data.logo || "",
          content: data.content,
        });
      } catch (error) {
        setSnippetMessage("Error: " + (error as Error).message);
      }
    });
  }

  function handleEditResource(id: string) {
    setResourceMessage("");
    startTransition(async () => {
      try {
        const data = await getResource(id);
        setResourceForm({
          mode: "edit",
          id: data.id,
          title: data.title,
          link: data.link,
          websiteLink: data.websiteLink,
          description: data.description,
          category: data.category,
          sortOrder: data.sortOrder,
        });
      } catch (error) {
        setResourceMessage("Error: " + (error as Error).message);
      }
    });
  }

  async function handleBlogSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBlogMessage("");
    const payload = {
      title: blogForm.title,
      slug: blogForm.slug,
      description: blogForm.description,
      date: blogForm.date,
      content: blogForm.content,
      id: blogForm.id,
    };

    startTransition(async () => {
      try {
        const result = blogForm.mode === "edit"
          ? await updateBlogPost(payload)
          : await createBlogPost(payload);
        if (!result.success) {
          setBlogMessage("Error: " + (result.error ?? "Invalid blog data"));
          return;
        }
        setBlogMessage(blogForm.mode === "edit" ? "Blog post updated." : "Blog post created.");
        if (blogForm.mode === "edit") {
          setBlogForm((prev) => ({ ...prev }));
        }
      } catch (error) {
        setBlogMessage("Error: " + (error as Error).message);
      }
    });
  }

  async function handleSnippetSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSnippetMessage("");
    const payload = {
      title: snippetForm.title,
      slug: snippetForm.slug,
      description: snippetForm.description,
      logo: snippetForm.logo || undefined,
      content: snippetForm.content,
      id: snippetForm.id,
    };

    startTransition(async () => {
      try {
        const result = snippetForm.mode === "edit"
          ? await updateSnippet(payload)
          : await createSnippet(payload);
        if (!result.success) {
          setSnippetMessage("Error: " + (result.error ?? "Invalid snippet data"));
          return;
        }
        setSnippetMessage(snippetForm.mode === "edit" ? "Snippet updated." : "Snippet created.");
        if (snippetForm.mode === "edit") {
          setSnippetForm((prev) => ({ ...prev }));
        }
      } catch (error) {
        setSnippetMessage("Error: " + (error as Error).message);
      }
    });
  }

  async function handleResourceSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResourceMessage("");
    const payload = {
      id: resourceForm.id,
      title: resourceForm.title,
      link: resourceForm.link,
      websiteLink: resourceForm.websiteLink,
      description: resourceForm.description,
      category: resourceForm.category,
      sortOrder: resourceForm.sortOrder,
    };

    startTransition(async () => {
      try {
        const result = resourceForm.mode === "edit"
          ? await updateResource(payload)
          : await createResource(payload);
        if (!result.success) {
          setResourceMessage("Error: " + (result.error ?? "Invalid resource data"));
          return;
        }
        const refreshed = await listResources();
        setResourceItems(refreshed.map((r) => ({
          id: r.id,
          title: r.title,
          link: r.link,
          websiteLink: r.websiteLink,
          description: r.description,
          category: r.category,
          sortOrder: r.sortOrder,
        })));
        setResourceMessage(resourceForm.mode === "edit" ? "Resource updated." : "Resource created.");
        if (resourceForm.mode === "edit") {
          setResourceForm((prev) => ({ ...prev }));
        } else {
          setResourceForm(emptyResource());
        }
      } catch (error) {
        setResourceMessage("Error: " + (error as Error).message);
      }
    });
  }

  async function handleResumeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResumeMessage("");
    const payload = {
      title: resumeForm.title,
      subtitle: resumeForm.subtitle,
      summary: resumeForm.summary,
      fileUrl: resumeForm.fileUrl,
      downloadName: resumeForm.downloadName,
    };

    startTransition(async () => {
      try {
        const result = await updateResume(payload);
        if (!result.success) {
          setResumeMessage("Error: " + (result.error ?? "Invalid resume data"));
          return;
        }
        setResumeMessage("Resume updated.");
      } catch (error) {
        setResumeMessage("Error: " + (error as Error).message);
      }
    });
  }

  function handleDeleteBlog(id: string) {
    if (!window.confirm("Delete this blog post permanently?")) return;
    startTransition(async () => {
      const result = await deleteBlog(id);
      if (!result.success) {
        setBlogMessage("Error: " + (result.error ?? "Failed to delete blog post"));
        return;
      }
      setBlogItems((prev) => prev.filter((item) => item.id !== id));
      if (blogForm.id === id) resetBlogForm();
    });
  }

  function handleDeleteSnippet(id: string) {
    if (!window.confirm("Delete this snippet permanently?")) return;
    startTransition(async () => {
      const result = await deleteSnippet(id);
      if (!result.success) {
        setSnippetMessage("Error: " + (result.error ?? "Failed to delete snippet"));
        return;
      }
      setSnippetItems((prev) => prev.filter((item) => item.id !== id));
      if (snippetForm.id === id) resetSnippetForm();
    });
  }

  function handleDeleteResource(id: string) {
    if (!window.confirm("Delete this resource permanently?")) return;
    startTransition(async () => {
      const result = await deleteResource(id);
      if (!result.success) {
        setResourceMessage("Error: " + (result.error ?? "Failed to delete resource"));
        return;
      }
      setResourceItems((prev) => prev.filter((item) => item.id !== id));
      if (resourceForm.id === id) resetResourceForm();
    });
  }

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/70">
          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={activeForm === "blog" ? "default" : "outline"}
                  onClick={() => setActiveForm("blog")}
                >
                  Blogs
                </Button>
                <Button
                  type="button"
                  variant={activeForm === "snippet" ? "default" : "outline"}
                  onClick={() => setActiveForm("snippet")}
                >
                  Snippets
                </Button>
                <Button
                  type="button"
                  variant={activeForm === "resources" ? "default" : "outline"}
                  onClick={() => setActiveForm("resources")}
                >
                  Resources
                </Button>
                <Button
                  type="button"
                  variant={activeForm === "cv" ? "default" : "outline"}
                  onClick={() => setActiveForm("cv")}
                >
                  CV
                </Button>
              </div>
              <form action={logout}>
                <Button type="submit" variant="outline">Logout</Button>
              </form>
            </div>

            {activeForm === "blog" && (
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
              <CardHeader>
                <CardTitle>Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button type="button" className="w-full" variant="outline" onClick={resetBlogForm}>
                  New Post
                </Button>
                <div className="space-y-2">
                  {sortedBlogs.map((post) => (
                    <div key={post.slug} className="border border-gray-200 dark:border-zinc-800/80 rounded-md p-3 bg-white/80 dark:bg-zinc-900/60">
                      <div className="text-sm font-medium">{post.title}</div>
                      <div className="text-xs text-muted-foreground">{post.date}</div>
                      <div className="mt-2 flex gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => handleEditBlog(post.id)}>
                          Edit
                        </Button>
                        <Button type="button" size="sm" variant="destructive" onClick={() => handleDeleteBlog(post.id)}>
                          Delete
                        </Button>
                        <Button type="button" size="sm" variant="secondary" asChild>
                          <a href={`/blogs/${post.slug}`} target="_blank" rel="noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
              <CardHeader>
                <CardTitle>{blogForm.mode === "edit" ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input value={blogForm.title} onChange={(e) => setBlogField("title", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input value={blogForm.slug} onChange={(e) => setBlogField("slug", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={blogForm.description}
                      onChange={(e) => setBlogField("description", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input value={blogForm.date} onChange={(e) => setBlogField("date", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content (Markdown)</label>
                    <Textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogField("content", e.target.value)}
                      className="min-h-[300px]"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : blogForm.mode === "edit" ? "Update Post" : "Create Post"}
                  </Button>
                  {blogMessage && (
                    <p className={`mt-4 text-sm ${blogMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                      {blogMessage}
                    </p>
                  )}
                </form>
              </CardContent>
                </Card>
              </div>
            )}
            {activeForm === "snippet" && (
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
              <CardHeader>
                <CardTitle>Snippets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button type="button" className="w-full" variant="outline" onClick={resetSnippetForm}>
                  New Snippet
                </Button>
                <div className="space-y-2">
                  {snippetItems.map((snippet) => (
                    <div key={snippet.slug} className="border border-gray-200 dark:border-zinc-800/80 rounded-md p-3 bg-white/80 dark:bg-zinc-900/60">
                      <div className="text-sm font-medium">{snippet.title}</div>
                      <div className="text-xs text-muted-foreground">{snippet.slug}</div>
                      <div className="mt-2 flex gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => handleEditSnippet(snippet.id)}>
                          Edit
                        </Button>
                        <Button type="button" size="sm" variant="destructive" onClick={() => handleDeleteSnippet(snippet.id)}>
                          Delete
                        </Button>
                        <Button type="button" size="sm" variant="secondary" asChild>
                          <a href={`/snippets/${snippet.slug}`} target="_blank" rel="noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
              <CardHeader>
                <CardTitle>{snippetForm.mode === "edit" ? "Edit Snippet" : "Create New Snippet"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSnippetSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={snippetForm.title}
                      onChange={(e) => setSnippetField("title", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      value={snippetForm.slug}
                      onChange={(e) => setSnippetField("slug", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={snippetForm.description}
                      onChange={(e) => setSnippetField("description", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo (optional)</label>
                    <Input
                      value={snippetForm.logo}
                      onChange={(e) => setSnippetField("logo", e.target.value)}
                      placeholder="logo.svg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content (Markdown)</label>
                    <Textarea
                      value={snippetForm.content}
                      onChange={(e) => setSnippetField("content", e.target.value)}
                      className="min-h-[240px]"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : snippetForm.mode === "edit" ? "Update Snippet" : "Create Snippet"}
                  </Button>
                  {snippetMessage && (
                    <p className={`mt-4 text-sm ${snippetMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                      {snippetMessage}
                    </p>
                  )}
                </form>
              </CardContent>
                </Card>
              </div>
            )}
            {activeForm === "resources" && (
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button type="button" className="w-full" variant="outline" onClick={resetResourceForm}>
                      New Resource
                    </Button>
                    <div className="space-y-2">
                      {sortedResources.map((resource) => (
                        <div key={resource.id} className="border border-gray-200 dark:border-zinc-800/80 rounded-md p-3 bg-white/80 dark:bg-zinc-900/60">
                          <div className="text-sm font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">{resource.category}</div>
                          <div className="mt-2 flex gap-2">
                            <Button type="button" size="sm" variant="outline" onClick={() => handleEditResource(resource.id)}>
                              Edit
                            </Button>
                            <Button type="button" size="sm" variant="destructive" onClick={() => handleDeleteResource(resource.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
                  <CardHeader>
                    <CardTitle>{resourceForm.mode === "edit" ? "Edit Resource" : "Create Resource"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleResourceSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={resourceForm.title}
                          onChange={(e) => setResourceField("title", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Link</label>
                        <Input
                          value={resourceForm.link}
                          onChange={(e) => setResourceField("link", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Website Label</label>
                        <Input
                          value={resourceForm.websiteLink}
                          onChange={(e) => setResourceField("websiteLink", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={resourceForm.description}
                          onChange={(e) => setResourceField("description", e.target.value)}
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input
                          value={resourceForm.category}
                          onChange={(e) => setResourceField("category", e.target.value)}
                          list="resource-categories"
                          required
                        />
                        <datalist id="resource-categories">
                          {Array.from(new Set(resourceItems.map((r) => r.category))).map((cat) => (
                            <option key={cat} value={cat} />
                          ))}
                        </datalist>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sort Order</label>
                        <Input
                          type="number"
                          value={resourceForm.sortOrder}
                          onChange={(e) => setResourceField("sortOrder", Number(e.target.value))}
                          min={0}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : resourceForm.mode === "edit" ? "Update Resource" : "Create Resource"}
                      </Button>
                      {resourceMessage && (
                        <p className={`mt-4 text-sm ${resourceMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                          {resourceMessage}
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeForm === "cv" && (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr] gap-6">
                <Card className="bg-white/90 dark:bg-zinc-900/70 border-gray-200 dark:border-zinc-800/80">
                  <CardHeader>
                    <CardTitle>Edit Resume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleResumeSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={resumeForm.title}
                          onChange={(e) => setResumeField("title", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input
                          value={resumeForm.subtitle}
                          onChange={(e) => setResumeField("subtitle", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Summary</label>
                        <Textarea
                          value={resumeForm.summary}
                          onChange={(e) => setResumeField("summary", e.target.value)}
                          rows={4}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">File URL</label>
                        <Input
                          value={resumeForm.fileUrl}
                          onChange={(e) => setResumeField("fileUrl", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Download Name</label>
                        <Input
                          value={resumeForm.downloadName}
                          onChange={(e) => setResumeField("downloadName", e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Update Resume"}
                      </Button>
                      {resumeMessage && (
                        <p className={`mt-4 text-sm ${resumeMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                          {resumeMessage}
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
