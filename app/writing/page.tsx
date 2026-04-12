import Link from "next/link";
import { getAllPosts } from "@/lib/writing";
import { FloatingNav } from "@/components/floating-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-svh flex-col justify-between px-6 py-16 sm:px-12 md:px-24 lg:px-32">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-display font-normal text-heading-32 text-foreground transition-colors hover:text-muted-foreground">
          FINCH
        </Link>
        <ThemeToggle />
      </header>

      <main className="my-auto py-24">
        <nav className="flex flex-col gap-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <span>{post.title}</span>
              {post.isNew && (
                <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </nav>
      </main>

      <FloatingNav articles={posts} />
    </div>
  );
}
