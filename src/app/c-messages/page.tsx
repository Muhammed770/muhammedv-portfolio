/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { isAuthed } from "@/lib/inbox-auth";
import { getInbox, type InboxItem } from "@/lib/inbox";
import type { Metadata } from "next";
import { login, logout } from "./actions";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

const BLUR_FADE_DELAY = 0.04;

const BUTTON =
  "rounded-lg border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const formatDate = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dubai",
  });

function Login({ error }: { error: boolean }) {
  return (
    <section className="mx-auto flex max-w-sm flex-col gap-6 pt-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter the password to read the inbox.</p>
      </div>
      <form action={login} className="flex flex-col gap-3">
        <input
          type="password"
          name="password"
          aria-label="Password"
          autoComplete="current-password"
          required
          autoFocus
          className="h-10 w-full rounded-lg border border-border bg-muted/40 px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex items-center gap-4">
          <button type="submit" className={BUTTON}>
            Unlock
          </button>
          {error && (
            <p role="alert" className="font-mono text-xs text-muted-foreground">
              wrong password.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

function Item({ item }: { item: InboxItem }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border p-4">
      <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <span className="uppercase tracking-[0.2em]">{item.kind === "text" ? "Write" : "Draw"}</span>
        <time dateTime={item.uploadedAt.toISOString()} className="tabular-nums">
          {formatDate(item.uploadedAt)}
        </time>
      </div>
      {item.kind === "text" ? (
        <p className="whitespace-pre-wrap break-words leading-relaxed">{item.text}</p>
      ) : (
        <a href={`/c-messages/drawings/${item.file}`} target="_blank" rel="noopener noreferrer">
          <img
            src={`/c-messages/drawings/${item.file}`}
            alt="Anonymous drawing"
            loading="lazy"
            className="aspect-[3/2] w-full rounded-lg border border-border object-contain"
          />
        </a>
      )}
    </article>
  );
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isAuthed())) {
    const { error } = await searchParams;
    return <Login error={Boolean(error)} />;
  }

  const items = await getInbox();

  return (
    <section className="flex flex-col gap-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Messages{" "}
            <span className="ml-1 rounded-md border border-border bg-card px-2 py-1 text-sm text-muted-foreground">
              {items.length}
            </span>
          </h1>
          <form action={logout}>
            <button type="submit" className={BUTTON}>
              Lock
            </button>
          </form>
        </div>
      </BlurFade>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <BlurFade key={item.id} delay={BLUR_FADE_DELAY * 2 + Math.min(i, 10) * 0.03}>
              <Item item={item} />
            </BlurFade>
          ))}
        </div>
      )}
    </section>
  );
}
