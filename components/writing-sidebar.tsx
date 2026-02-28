import Link from "next/link";
import type { Post } from "@/lib/writing";

interface WritingSidebarProps {
  posts: Post[];
  currentSlug: string;
}

export function WritingBottomNav({ posts, currentSlug }: WritingSidebarProps) {
  return (
    <aside className="mt-16 border-t border-border pt-8 lg:hidden">
      <p className="text-label-12 text-muted-foreground mb-3 uppercase tracking-wider">
        Writing
      </p>
      <nav className="flex flex-col gap-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              post.slug === currentSlug
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {post.title.length > 30 ? `${post.title.slice(0, 30)}…` : post.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function WritingSidebarDesktop({ posts, currentSlug }: WritingSidebarProps) {
  return (
    <aside className="sticky top-16 hidden overflow-hidden lg:block">
      <p className="text-label-12 text-muted-foreground mb-3 uppercase tracking-wider">
        Writing
      </p>
      <nav className="flex flex-col gap-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className={`truncate rounded-md px-3 py-2 text-sm transition-colors ${
              post.slug === currentSlug
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {post.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
