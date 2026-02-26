"use client";

import { useState, useTransition } from "react";
import { createBlogPost } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      date: new Date().toISOString().split("T")[0],
      content: formData.get("content") as string,
    };

    startTransition(async () => {
      try {
        await createBlogPost(data);
        setMessage("Blog post created successfully!");
      } catch (error) {
        setMessage("Error: " + (error as Error).message);
      }
    });
  }

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" placeholder="Blog Title" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input name="slug" placeholder="my-awesome-post" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input name="description" placeholder="Short summary" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content (Markdown)</label>
                <Textarea
                  name="content"
                  placeholder="Write your blog content here..."
                  className="min-h-[300px]"
                  required
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Post"}
              </Button>
              {message && (
                <p className={`mt-4 text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
