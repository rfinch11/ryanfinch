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
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
              post.slug === currentSlug
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {post.title}
            {post.isNew && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
                NEW
              </span>
            )}
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
            className={`flex items-center gap-2 truncate rounded-md px-3 py-2 text-sm transition-colors ${
              post.slug === currentSlug
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span className="truncate">{post.title}</span>
            {post.isNew && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
                NEW
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
