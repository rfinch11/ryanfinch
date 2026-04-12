import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  video: string;
  thumb: string;
  isNew?: boolean;
}

export interface ProjectWithContent extends Project {
  content: string;
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      subtitle: (data.subtitle as string) ?? undefined,
      description: (data.description as string) ?? undefined,
      video: (data.video as string) ?? "",
      thumb: (data.thumb as string) ?? "",
      isNew: (data.new as boolean) ?? false,
    };
  });
}

export function getProjectBySlug(slug: string): ProjectWithContent {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    subtitle: (data.subtitle as string) ?? undefined,
    description: (data.description as string) ?? undefined,
    video: (data.video as string) ?? "",
    thumb: (data.thumb as string) ?? "",
    content,
  };
}
