import Link from "next/link";
import { getAllPosts } from "@/lib/writing";
import { getAllProjects } from "@/lib/projects";
import { FloatingNav } from "@/components/floating-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ProjectsPage() {
  const articles = getAllPosts();
  const projects = getAllProjects();

  return (
    <div className="flex min-h-svh flex-col justify-between px-6 py-16 sm:px-12 md:px-24 lg:px-32">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-display font-normal text-heading-32 text-foreground transition-colors hover:text-muted-foreground">
          FINCH
        </Link>
        <ThemeToggle />
      </header>

      <main className="my-auto py-24">
        <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-xl transition-opacity hover:opacity-80"
            >
              <img
                src={`/${project.thumb}`}
                alt={project.title}
                className="w-full rounded-xl object-cover aspect-video"
              />
            </Link>
          ))}
        </nav>
      </main>

      <FloatingNav articles={articles} />
    </div>
  );
}
