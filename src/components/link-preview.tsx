"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
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
        // Warm the image during the open delay so the card doesn't pop in empty.
        onPointerEnter={() => {
          new Image().src = preview.image;
        }}
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent side="top" collisionPadding={16} className="w-80 overflow-hidden p-0">
        <a href={href} {...linkProps} tabIndex={-1} className="group block">
          <img
            src={preview.image}
            alt=""
            width={1200}
            height={630}
            className="aspect-[1200/630] w-full object-cover object-top border-b bg-muted"
          />
          <div className="flex flex-col gap-1.5 p-4">
            <p className="font-semibold leading-tight">{preview.title}</p>
            <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
              {preview.description}
            </p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                {label}
              </span>
              <ArrowUpRight
                className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
                aria-hidden
              />
            </div>
          </div>
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
