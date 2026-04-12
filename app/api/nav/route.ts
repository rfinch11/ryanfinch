import { getAllPosts } from "@/lib/writing";
import { getAllProjects } from "@/lib/projects";

export function GET() {
  const posts = getAllPosts().map((p) => p.slug);
  const projects = getAllProjects().map((p) => p.slug);
  return Response.json({ posts, projects });
}
