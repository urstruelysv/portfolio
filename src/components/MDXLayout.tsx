import { ReactNode } from "react";

interface MDXLayoutProps {
  children: ReactNode;
}

export default function MDXLayout({ children }: MDXLayoutProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-code:text-gray-800 dark:prose-code:text-gray-200">
      {children}
    </article>
  );
}
