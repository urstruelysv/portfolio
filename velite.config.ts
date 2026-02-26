import { defineCollection, defineConfig, s } from "velite";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

const blogs = defineCollection({
  name: "Blog",
  pattern: "blogs/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug().optional(),
      date: s.isodate(),
      description: s.string().max(200),
      author: s.string().default("Sai Vamshi"),
      content: s.mdx(),
    })
    .transform((data) => {
      const slug = data.slug || data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        ...data,
        slug,
        permalink: `/blogs/${slug}`,
      };
    }),
});

const snippets = defineCollection({
  name: "Snippet",
  pattern: "snippets/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug().optional(),
      description: s.string().max(200),
      logo: s.string().optional(),
      content: s.mdx(),
    })
    .transform((data) => {
      const slug = data.slug || data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        ...data,
        slug,
        permalink: `/snippets/${slug}`,
      };
    }),
});

export default defineConfig({
  root: "src/data",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { blogs, snippets },
  mdx: {
    outputFormat: "function-body",
    rehypePlugins: [rehypePrism],
    remarkPlugins: [remarkGfm],
  },
});