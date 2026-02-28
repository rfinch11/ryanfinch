"use client";

import Link from "next/link";
import { Sparkle, File, Pencil, Send, Github, Mail, ChevronUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Playground", href: "/projects", icon: Sparkle },
  { label: "Resume", href: "/resume", icon: File },
];

const CONTACT_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rfinch/", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/rfinch11", icon: Github },
  { label: "Email", href: "mailto:ryantfinch@gmail.com", icon: Mail },
];

interface Article {
  slug: string;
  title: string;
}

interface FloatingNavProps {
  articles?: Article[];
}

export function FloatingNav({ articles = [] }: FloatingNavProps) {
  return (
    <div className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {NAV_LINKS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex items-center gap-0 rounded-full bg-transparent p-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:gap-1.5 lg:px-4 lg:py-2"
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="max-w-0 overflow-hidden opacity-0 lg:max-w-32 lg:opacity-100">
              {label}
            </span>
          </Link>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <button className="inline-flex items-center gap-0 rounded-full bg-transparent p-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:gap-1.5 lg:px-4 lg:py-2">
              <Pencil className="h-4 w-4 shrink-0" />
              <span className="max-w-0 overflow-hidden opacity-0 lg:max-w-32 lg:opacity-100">
                Writing
              </span>
              <ChevronUp className="h-3 w-3 shrink-0 hidden lg:block" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="center"
            sideOffset={12}
            className="w-auto p-1"
          >
            <div className="relative">
              <nav className="flex max-h-64 flex-col overflow-y-auto pb-8">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/writing/${article.slug}`}
                    className="whitespace-nowrap rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {article.title}
                  </Link>
                ))}
              </nav>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-popover to-transparent" />
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <button className="inline-flex items-center gap-0 rounded-full bg-transparent p-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:gap-1.5 lg:px-4 lg:py-2">
              <Send className="h-4 w-4 shrink-0" />
              <span className="max-w-0 overflow-hidden opacity-0 lg:max-w-32 lg:opacity-100">
                Contact
              </span>
              <ChevronUp className="h-3 w-3 shrink-0 hidden lg:block" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            sideOffset={12}
            className="w-auto p-1"
          >
            {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
