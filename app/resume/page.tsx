import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAllPosts } from "@/lib/writing";
import { WorkTimeline } from "./work-timeline";

export default function ResumePage() {
  const articles = getAllPosts();

  return (
    <div className="flex min-h-svh flex-col px-6 py-16 sm:px-12 md:px-24 lg:px-32">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-normal text-heading-32 text-foreground transition-colors hover:text-muted-foreground"
        >
          FINCH
        </Link>
        <ThemeToggle />
      </header>

      <main className="pt-24">
        <WorkTimeline />
      </main>

      <div className="mt-auto">
        <FloatingNav articles={articles} />
      </div>
    </div>
  );
}
