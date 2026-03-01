"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronsUpDown, ChevronsDownUp, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkLink {
  label: string;
  href: string;
}

interface GalleryItem {
  src: string;
  type: "image" | "video" | "gif";
  caption?: string;
  link?: WorkLink;
}

interface WorkEntry {
  id: string;
  company: string;
  dateRange: string;
  title: string;
  location: string;
  description: string;
  gallery: GalleryItem[];
  links: WorkLink[];
}

const WORK_HISTORY: WorkEntry[] = [
  {
    id: "zoox",
    company: "Zoox",
    dateRange: "2023 — Present",
    title: "Senior Manager, Product Design",
    location: "Foster City, CA",
    description:
      "Leading product design for Ops Tools, AI agents, and service design for the world's first purpose-built robotaxi company.",
    gallery: [
      { src: "https://picsum.photos/seed/zoox1/600/400", type: "image", caption: "Ops dashboard for fleet management" },
      { src: "https://picsum.photos/seed/zoox2/400/600", type: "image", caption: "Rider app experience" },
      { src: "https://picsum.photos/seed/zoox3/600/400", type: "image", caption: "Service design blueprint", link: { label: "Case study", href: "https://zoox.com/" } },
    ],
    links: [{ label: "Zoox", href: "https://zoox.com/" }],
  },
  {
    id: "meta",
    company: "Meta",
    dateRange: "2019 — 2023",
    title: "Senior Manager, UX Research",
    location: "Menlo Park, CA",
    description:
      "Led research for Facebook Sharing across Reels, Stories, Feed, Messenger, and Facebook Lite.",
    gallery: [
      { src: "https://picsum.photos/seed/meta1/600/400", type: "image", caption: "Reels creation flow" },
      { src: "https://picsum.photos/seed/meta2/400/600", type: "image", caption: "Stories composer redesign" },
      { src: "https://picsum.photos/seed/meta3/600/400", type: "image", caption: "Feed ranking research" },
      { src: "https://picsum.photos/seed/meta4/600/400", type: "image", caption: "Messenger sharing patterns", link: { label: "Reels launch", href: "https://about.fb.com/news/2022/02/launching-facebook-reels-globally/" } },
    ],
    links: [
      {
        label: "Reels launch",
        href: "https://about.fb.com/news/2022/02/launching-facebook-reels-globally/",
      },
      {
        label: "Stories ads",
        href: "https://www.facebook.com/business/ads/stories-ad-format#",
      },
    ],
  },
  {
    id: "ford",
    company: "Ford",
    dateRange: "2017 — 2019",
    title: "Design Lead",
    location: "Palo Alto, CA",
    description:
      "Incubating autonomous vehicle services, connected vehicles, and mobility services in IDEO x Ford's Human Centered Design Lab, D-Ford.",
    gallery: [
      { src: "https://picsum.photos/seed/ford1/600/400", type: "image", caption: "Autonomous vehicle service concept" },
      { src: "https://picsum.photos/seed/ford2/400/600", type: "image", caption: "Connected vehicle prototype", link: { label: "D-Ford", href: "https://medium.com/dford" } },
    ],
    links: [{ label: "D-Ford", href: "https://medium.com/dford" }],
  },
  {
    id: "crown",
    company: "Crown",
    dateRange: "2015 — 2017",
    title: "Manager, Design Research",
    location: "New Bremen, OH",
    description:
      "Led design and UX research across fleet management software, connected products, autonomous equipment, consultative services, and new business models.",
    gallery: [
      { src: "https://picsum.photos/seed/crown1/600/400", type: "image", caption: "Fleet management dashboard" },
      { src: "https://picsum.photos/seed/crown2/600/400", type: "image", caption: "Connected forklift analytics" },
      { src: "https://picsum.photos/seed/crown3/400/600", type: "image", caption: "Operator interface study" },
    ],
    links: [
      { label: "Crown", href: "https://www.crown.com/en-us.html" },
      {
        label: "Forklift utilization",
        href: "https://www.mhlnews.com/powered-vehicles-and-forklifts/article/22055166/better-data-adds-up-to-better-forklift-utilization",
      },
    ],
  },
  {
    id: "early",
    company: "Heathco",
    dateRange: "2013 — 2015",
    title: "Industrial + Graphic Designer",
    location: "Bowling Green, KY",
    description:
      "Solo designer for all web, social, packaging, and in-store visual design. Industrial designer for national doorbell line.",
    gallery: [
      { src: "https://picsum.photos/seed/heathco1/600/400", type: "image", caption: "Doorbell product line" },
      { src: "https://picsum.photos/seed/heathco2/400/600", type: "image", caption: "Packaging design" },
    ],
    links: [],
  },
];

function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    const threshold = 50;
    if (delta > threshold) goPrev();
    else if (delta < -threshold) goNext();
    touchStart.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Prev/Next arrows — desktop only */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 z-50 hidden rounded-full border border-border bg-background p-2.5 text-muted-foreground transition-colors hover:text-foreground sm:block"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 z-50 hidden rounded-full border border-border bg-background p-2.5 text-muted-foreground transition-colors hover:text-foreground sm:block"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Content */}
      <div
        className="relative flex max-h-[90vh] max-w-3xl flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Corner notch close button */}
        <button
          onClick={onClose}
          className="absolute right-0 top-0 z-10 flex items-start justify-end rounded-bl-xl bg-background p-3 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media */}
        {item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            className="max-h-[70vh] w-full rounded-lg object-contain"
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.caption ?? ""}
            className="max-h-[70vh] w-full rounded-lg object-contain"
          />
        )}

        {/* Caption, link & counter */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-copy-14 text-muted-foreground">
            {item.caption ?? ""}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-copy-14 text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
              >
                {item.link.label}
              </a>
            )}
            <span className="text-label-14 text-muted-foreground">
              {index + 1}/{items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkTimeline() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = useState<{ items: GalleryItem[]; index: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allExpanded = expandedIds.size === WORK_HISTORY.length;

  const toggleSection = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedIds(new Set(WORK_HISTORY.map((e) => e.id)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        collapseAll();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [collapseAll]);

  return (
    <div ref={wrapperRef}>
      <div className="relative max-w-2xl">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-border md:block" />
        {/* Timeline top: expand/collapse all chevron arrowhead */}
        <button
          onClick={allExpanded ? collapseAll : expandAll}
          className="absolute -top-7 left-0 z-10 hidden -translate-x-1/2 rounded-full border border-border bg-background p-2.5 text-muted-foreground transition-colors hover:text-foreground md:block"
          aria-label={allExpanded ? "Collapse all" : "Expand all"}
        >
          {allExpanded ? (
            <ChevronsDownUp className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4" />
          )}
        </button>
        {/* Mobile expand/collapse button */}
        <div className="mb-8 flex justify-end md:hidden">
          <button
            onClick={allExpanded ? collapseAll : expandAll}
            className="text-label-14 text-muted-foreground transition-colors hover:text-foreground"
          >
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className="flex flex-col md:pl-10">
          {WORK_HISTORY.map((entry) => {
            const isExpanded = expandedIds.has(entry.id);
            return (
              <div key={entry.id} className="relative">
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute -left-10 top-8 hidden h-2 w-2 rounded-full border transition-colors duration-300 md:block",
                    isExpanded
                      ? "border-foreground bg-foreground"
                      : "border-border bg-background"
                  )}
                  style={{ transform: "translateX(-50%)" }}
                />

                {/* Collapsed header */}
                <button
                  onClick={() => toggleSection(entry.id)}
                  className="group flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-display font-normal text-heading-32 uppercase text-foreground transition-colors group-hover:text-muted-foreground">
                      {entry.company}
                    </span>
                    {isExpanded ? (
                      <ChevronsDownUp className="h-4 w-4 text-muted-foreground opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100" />
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 text-muted-foreground opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100" />
                    )}
                  </span>
                  <span className="text-label-14 text-muted-foreground">
                    {entry.dateRange}
                  </span>
                </button>

                {/* Expandable content */}
                <div
                  className="grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out"
                  style={{
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 pb-6 pt-2">
                      <p className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-copy-14 font-bold">{entry.title}</span>
                        <span className="flex items-center gap-1.5 text-label-14">
                          <MapPin className="h-3.5 w-3.5" />
                          {entry.location}
                        </span>
                      </p>
                      <p className="text-copy-14 text-muted-foreground">
                        {entry.description}
                      </p>

                      {entry.gallery.length > 0 && (
                        <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:-mx-0 sm:px-0">
                          {entry.gallery.map((item, i) => (
                            <button
                              key={i}
                              onClick={() => setLightbox({ items: entry.gallery, index: i })}
                              className="group/thumb shrink-0 overflow-hidden rounded-lg"
                            >
                              <img
                                src={item.src}
                                alt={item.caption ?? ""}
                                className="h-32 w-auto rounded-lg object-cover transition-transform duration-200 group-hover/thumb:scale-105 sm:h-40"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {entry.links.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {entry.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-copy-14 text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <GalleryLightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => setLightbox({ ...lightbox, index: i })}
        />
      )}
    </div>
  );
}
