"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-8 mb-3">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mt-7 mb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground mt-6 mb-2">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg sm:text-xl font-semibold text-foreground mt-5 mb-1.5">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-base sm:text-lg font-semibold text-foreground mt-4 mb-1">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-sm sm:text-base font-semibold text-muted-foreground mt-3 mb-1">
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-3">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-muted-foreground">{children}</em>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground text-base sm:text-lg mb-3">
            {children}
          </ol>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground text-base sm:text-xl mb-3">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed marker:text-muted-foreground">
            {children}
          </li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            onClick={(e) => {
              if (!href) return;
              e.preventDefault();
              e.stopPropagation();
              window.location.href = href;
            }}
            className="text-primary hover:underline underline-offset-4 cursor-pointer"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="my-4 border-border" />,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground my-3">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm font-mono">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
