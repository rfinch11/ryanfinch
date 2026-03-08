import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/writing");

export interface Post {
  slug: string;
  title: string;
  isNew?: boolean;
}

export interface PostWithContent extends Post {
  content: string;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      isNew: (data.new as boolean) ?? false,
    };
  });

  return posts.sort((a, b) => {
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getPostBySlug(slug: string): PostWithContent {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    content,
  };
}
