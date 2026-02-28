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

      <main className="my-auto flex flex-col gap-8 py-24">
        <h1 className="text-heading-32">Writing</h1>
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="text-copy-16 text-muted-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <FloatingNav articles={posts} />
    </div>
  );
}
