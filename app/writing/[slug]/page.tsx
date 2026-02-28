import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/writing";
import { mdxComponents } from "@/components/mdx-components";
import { WritingBottomNav, WritingSidebarDesktop } from "@/components/writing-sidebar";
import { FloatingNav } from "@/components/floating-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();

  return (
    <div className="min-h-svh px-6 py-16 sm:px-12 md:px-24 lg:px-32">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-display font-normal text-heading-32 text-foreground transition-colors hover:text-muted-foreground">
          FINCH
        </Link>
        <ThemeToggle />
      </header>

      <div className="py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[240px_1fr]">
          <WritingSidebarDesktop posts={allPosts} currentSlug={slug} />

          <main className="max-w-2xl">
            <h1 className="text-heading-32">{post.title}</h1>
            <article className="mt-8">
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>
            <WritingBottomNav posts={allPosts} currentSlug={slug} />
          </main>
        </div>
      </div>

      <FloatingNav articles={allPosts} />
    </div>
  );
}
