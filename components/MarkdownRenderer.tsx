"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw"; 
import "highlight.js/styles/github-dark.css"; 

const MarkdownRenderer = ({ content }: { content: string }) => {
  useEffect(() => {
    
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((pre) => {
      
      if (pre.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className =
        "absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-75 hover:opacity-100 transition";
      button.onclick = () => {
        const code = pre.querySelector("code")?.innerText;
        if (code) {
          navigator.clipboard.writeText(code);
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 1500);
        }
      };

      
      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, [content]); 

  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
