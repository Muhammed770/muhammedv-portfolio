"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export interface LinkPreviewData {
  title: string;
  description: string;
  // More than one image crossfades as a slideshow while the card is open.
  images: readonly string[];
}

const SLIDE_MS = 2500;

// Mounted only while the card is open, so the slideshow restarts on every hover.
function PreviewBody({ preview, label }: { preview: LinkPreviewData; label: string }) {
  const { images } = preview;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      <div className="relative aspect-[1200/630] w-full border-b bg-muted">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1200}
            height={630}
            className={cn(
              "absolute inset-0 size-full object-cover object-top transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <p className="font-semibold leading-tight">{preview.title}</p>
        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
          {preview.description}
        </p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            {label}
          </span>
          <div className="flex items-center gap-2.5">
            {images.length > 1 && (
              <div className="flex gap-1" aria-hidden>
                {images.map((src, i) => (
                  <span
                    key={src}
                    className={cn(
                      "size-1.5 rounded-full transition-colors duration-300",
                      i === index ? "bg-foreground/70" : "bg-muted-foreground/25",
                    )}
                  />
                ))}
              </div>
            )}
            <ArrowUpRight
              className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface Props {
  href: string;
  preview: LinkPreviewData;
  children: ReactNode;
}

export function LinkPreview({ href, preview, children }: Props) {
  const external = /^https?:\/\//.test(href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const label = external ? new URL(href).hostname.replace(/^www\./, "") : href;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger
        href={href}
        {...linkProps}
        // Warm the images during the open delay so the card doesn't pop in empty.
        onPointerEnter={() => {
          for (const src of preview.images) new Image().src = src;
        }}
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent side="top" collisionPadding={16} className="w-80 overflow-hidden p-0">
        <a href={href} {...linkProps} tabIndex={-1} className="group block">
          <PreviewBody preview={preview} label={label} />
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
