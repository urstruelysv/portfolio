"use client";

import { MDXProvider as BaseMDXProvider } from "@mdx-js/react";
import { ReactNode } from "react";
import AnimatedGradient from "./AnimatedGradient";

const components = {
  h1: (props: any) => (
    <h1
      className="text-4xl font-bold mb-6 text-black dark:text-white"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-3xl font-bold mb-4 text-black dark:text-white"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-2xl font-bold mb-3 text-black dark:text-white"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  code: (props: any) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props: any) => <li className="mb-2" {...props} />,
  a: (props: any) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4"
      {...props}
    />
  ),
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
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
          {number}
        </span>
        <h3 className="text-xl font-bold text-black dark:text-white">
          {title}
        </h3>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  ),
};

interface MDXProviderProps {
  children: ReactNode;
}

export default function MDXProvider({ children }: MDXProviderProps) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>;
}
