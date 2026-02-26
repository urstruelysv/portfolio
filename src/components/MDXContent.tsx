"use client";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { useState, useEffect } from "react";

interface Props {
  code: string;
}

export function MDXContent({ code }: Props) {
  const [Content, setContent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    run(code, { ...runtime, baseUrl: import.meta.url }).then((mod) => {
      setContent(() => mod.default);
    });
  }, [code]);

  if (!Content) return null;
  return <Content />;
}