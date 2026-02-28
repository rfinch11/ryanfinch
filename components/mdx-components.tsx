import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-heading-32 mt-10 first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-heading-24 mt-10 first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-heading-20 mt-8 first:mt-0" {...props} />
  ),
  p: (props) => (
    <p className="text-copy-16 text-muted-foreground mt-4 first:mt-0" {...props} />
  ),
  a: (props) => (
    <a
      className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="text-copy-16 text-muted-foreground mt-4 list-disc pl-6 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="text-copy-16 text-muted-foreground mt-4 list-decimal pl-6 space-y-2" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-border pl-6 text-copy-16 text-muted-foreground italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-copy-14"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-copy-14"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
};
