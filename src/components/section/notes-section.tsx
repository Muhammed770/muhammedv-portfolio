/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import SectionHeader from "@/components/section/section-header";
import { getSortedPosts, getPostSlug, getReadingTime } from "@/lib/posts";

const BLUR_FADE_DELAY = 0.04;

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function NotesSection() {
  const posts = getSortedPosts().slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader
        label="Notes"
        title="Things I figured out"
        description="Setup guides, fixes and write-ups from building things."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {posts.map((post, id) => {
          const slug = getPostSlug(post);
          return (
            <BlurFade key={slug} delay={BLUR_FADE_DELAY * 13 + id * 0.05} className="h-full">
              <Link
                href={`/notes/${slug}`}
                className="group flex flex-col h-full rounded-xl border border-border overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200"
              >
                <div className="relative shrink-0 overflow-hidden bg-muted">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full aspect-video" />
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <time className="tabular-nums" dateTime={post.publishedAt}>
                          {formatShortDate(post.publishedAt)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" aria-hidden />
                          {getReadingTime(post.content)} min read
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm leading-snug">{post.title}</h3>
                    </div>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{post.summary}</p>
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </div>
      <div className="flex justify-center -mt-2">
        <Link
          href="/notes"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          View all notes
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
