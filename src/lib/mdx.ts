import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

const rootDirectory = path.join(process.cwd(), "src/data");

export interface FrontMatter {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  logo?: string;
  slug: string;
}

export interface Snippet {
  frontmatter: FrontMatter;
  mdxSource: any;
}

export async function getAllFilesFrontMatter(
  type: string
): Promise<FrontMatter[]> {
  const files = fs.readdirSync(path.join(rootDirectory, type));

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(
        path.join(rootDirectory, type, file),
        "utf8"
      );
      const { data } = matter(source);

      return {
        ...data,
        slug: file.replace(/\.mdx$/, ""),
      } as FrontMatter;
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<Snippet | null> {
  const source = path.join(rootDirectory, type, `${slug}.mdx`);

  try {
    if (!fs.existsSync(source)) {
      return null;
    }

    const fileContents = fs.readFileSync(source, "utf8");
    if (!fileContents) {
      return null;
    }

    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrism,
            {
              languageAliases: {
                "jsx:GradientBorder.jsx": "jsx",
                "js:GradientBorder.jsx": "javascript",
                "js:tailwind.config.js": "javascript",
              },
              defaultLanguage: "javascript",
              ignoreMissing: true,
            },
          ],
        ],
        format: "mdx",
        development: process.env.NODE_ENV === "development",
      },
      parseFrontmatter: false,
      scope: {
        AnimatedGradient: "AnimatedGradient",
      },
    });

    return {
      frontmatter: {
        ...data,
        slug,
      },
      mdxSource,
    };
  } catch (error) {
    console.error(`Error reading file ${source}:`, error);
    return null;
  }
}
