"use client";

import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import AnimatedGradient from "./AnimatedGradient";

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  AnimatedGradient,
};

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <h2 className="text-red-800 dark:text-red-200 font-semibold mb-2">
        Error rendering MDX content
      </h2>
      <pre className="text-sm text-red-700 dark:text-red-300">
        {error.message}
      </pre>
    </div>
  );
}

export default function MDXContent({ source }: MDXContentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!source) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200">
          No content available
        </p>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
        <p className="text-gray-800 dark:text-gray-200">Loading content...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote {...source} components={components} />
      </div>
    </ErrorBoundary>
  );
}
