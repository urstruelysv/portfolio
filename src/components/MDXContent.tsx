"use client";

import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import MDXProvider from "./MDXProvider";

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXProvider>
      <MDXRemote {...source} />
    </MDXProvider>
  );
}
