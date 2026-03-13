"use client";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";

interface Props {
  code: string;
  enableCopy?: boolean;
}

export function MDXContent({ code, enableCopy = false }: Props) {
  const [Content, setContent] = useState<React.ComponentType | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    run(code, { ...runtime, baseUrl: import.meta.url }).then((mod) => {
      setContent(() => mod.default);
    });
  }, [code]);

  useEffect(() => {
    if (!enableCopy || !contentRef.current || !Content) return;
    const container = contentRef.current;
    const pres = Array.from(container.querySelectorAll("pre"));
    for (const pre of pres) {
      if (pre.querySelector(".code-copy-btn")) return;
      pre.classList.add("code-block");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-btn";
      button.setAttribute("aria-label", "Copy code");
      button.dataset.label = "Copy";
      button.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm2 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16h-8V7h8v14z"/></svg>';
      button.onclick = async () => {
        const codeEl = pre.querySelector("code");
        const text = codeEl?.textContent ?? "";
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          button.classList.add("copied");
          button.dataset.label = "Copied";
          window.setTimeout(() => {
            button.classList.remove("copied");
            button.dataset.label = "Copy";
          }, 1200);
        } catch {
          button.dataset.label = "Failed";
          window.setTimeout(() => {
            button.dataset.label = "Copy";
          }, 1200);
        }
      };
      pre.appendChild(button);
    }
  }, [enableCopy, Content]);

  if (!Content) return null;
  return (
    <div ref={contentRef}>
      <Content />
    </div>
  );
}
