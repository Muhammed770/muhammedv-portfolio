import { allPosts } from "content-collections";

export type Post = (typeof allPosts)[number];

export function getPostSlug(post: Post) {
  return post._meta.path.replace(/\.mdx$/, "");
}

// Newest first; posts published on the same day fall back to title order so builds are stable.
export function getSortedPosts() {
  return [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime() ||
      a.title.localeCompare(b.title)
  );
}

export function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
