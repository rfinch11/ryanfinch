import Image from "next/image";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAllPosts } from "@/lib/writing";

export default function Home() {
  const articles = getAllPosts();

  return (
    <div className="flex min-h-svh flex-col justify-between px-6 py-16 sm:px-12 md:px-24 lg:px-32">
      <header className="flex items-center justify-end">
        <ThemeToggle />
      </header>

      <main className="my-auto flex flex-col gap-6 py-24">
        <div className="flex items-center gap-6">
          <Image
            src="/profile-color-clouds.png"
            alt="Ryan Finch"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="font-display font-normal text-heading-72">
            FINCH
          </h1>
        </div>
        <p className="max-w-xl text-copy-16 text-muted-foreground">
          Leading product design at{" "}
          <a href="https://zoox.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">Zoox</a>.
          Former runway model and current{" "}
          <a href="https://cwandt.com/products/pen-type-c?variant=42857372876956" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">ink pen</a>{" "}
          enthusiast. Helped launch{" "}
          <a href="https://about.fb.com/news/2022/02/launching-facebook-reels-globally/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">Reels</a>{" "}
          and grew{" "}
          <a href="https://www.facebook.com/business/ads/stories-ad-format#" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">Stories</a>{" "}
          to 1B+ DAUs at Meta. Incubated 0-1 products inside Ford&apos;s{" "}
          <a href="https://medium.com/dford" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">innovation lab</a>{" "}
          with IDEO, and developed{" "}
          <a href="https://www.mhlnews.com/powered-vehicles-and-forklifts/article/22055166/better-data-adds-up-to-better-forklift-utilization" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">new business models</a>{" "}
          and product lines for{" "}
          <a href="https://www.crown.com/en-us.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground">Crown</a>.
          There&apos;s a good chance I designed the doorbell in your house.
        </p>
      </main>

      <FloatingNav articles={articles} />
    </div>
  );
}
