"use client";
import { MDXProvider as BaseMDXProvider } from "@mdx-js/react";
import { ReactNode } from "react";
import AnimatedGradient from "./AnimatedGradient";

const components = {
  h1: (props: any) => (
    <h1
      className="text-4xl font-bold mb-6 text-black dark:text-white scroll-mt-20"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-3xl font-bold mb-4 mt-8 text-black dark:text-white scroll-mt-20"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-2xl font-bold mb-3 mt-6 text-black dark:text-white scroll-mt-20"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="text-xl font-bold mb-2 mt-4 text-black dark:text-white scroll-mt-20"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className="text-lg font-bold mb-2 mt-3 text-black dark:text-white scroll-mt-20"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className="text-base font-bold mb-2 mt-2 text-black dark:text-white scroll-mt-20"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1"
      {...props}
    />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  a: (props: any) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-blue-400 dark:border-blue-500 pl-4 py-2 italic my-6 bg-blue-50 dark:bg-blue-950/30 rounded-r-lg"
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
        {...props}
      />
    </div>
  ),
  th: (props: any) => (
    <th
      className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  img: (props: any) => (
    <img
      className="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto"
      loading="lazy"
      {...props}
    />
  ),
  // Custom components
  AnimatedGradient: AnimatedGradient,
  Step: ({
    number,
    title,
    children,
  }: {
    number: number;
    title: string;
    children: ReactNode;
  }) => (
    <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center mb-3">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold shadow-lg">
          {number}
        </span>
        <h3 className="text-xl font-bold text-black dark:text-white">
          {title}
        </h3>
      </div>
      <div className="ml-14">{children}</div>
    </div>
  ),
  Callout: ({
    type = "info",
    children,
  }: {
    type?: "info" | "warning" | "error" | "success";
    children: ReactNode;
  }) => {
    const styles = {
      info: "border-blue-400 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-100",
      warning:
        "border-yellow-400 bg-yellow-50 text-yellow-900 dark:bg-yellow-950/30 dark:text-yellow-100",
      error:
        "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-100",
      success:
        "border-green-400 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-100",
    };

    return (
      <div className={`border-l-4 p-4 my-4 rounded-r-lg ${styles[type]}`}>
        {children}
      </div>
    );
  },
  CodeBlock: ({ title, children }: { title?: string; children: ReactNode }) => (
    <div className="my-6">
      {title && (
        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-t-lg text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
          {title}
        </div>
      )}
      <div className={title ? "rounded-t-none" : "rounded-lg"}>{children}</div>
    </div>
  ),
};

interface MDXProviderProps {
  children: ReactNode;
}

export default function MDXProvider({ children }: MDXProviderProps) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>;
}
