import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getAllPosts } from "@/lib/writing";
import { mdxComponents } from "@/components/mdx-components";
import { FloatingNav } from "@/components/floating-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const articles = getAllPosts();

  return (
    <div className="min-h-svh px-6 py-16 sm:px-12 md:px-24 lg:px-32">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-display font-normal text-heading-32 text-foreground transition-colors hover:text-muted-foreground">
          FINCH
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-2xl py-24">
        <h1 className="text-heading-32">{project.title}</h1>
        {project.subtitle && (
          <p className="mt-2 text-copy-16 text-muted-foreground">{project.subtitle}</p>
        )}

        {project.video && (
          <div className="mt-8">
            <video
              src={`/${project.video}`}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full max-h-[70vh] rounded-xl object-contain"
            />
          </div>
        )}

        <article className="mt-8">
          <MDXRemote source={project.content} components={mdxComponents} />
        </article>
      </main>

      <FloatingNav articles={articles} />
    </div>
  );
}
