import BlurFade from "@/components/magicui/blur-fade";
import { DrawMessage, WriteMessage } from "@/components/anonymous-message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Link from "next/link";

const DESCRIPTION = "Write or draw me a message anonymously. No names.";

export const metadata: Metadata = {
  title: "Anonymous message",
  description: DESCRIPTION,
  openGraph: { title: "Anonymous message", description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: "Anonymous message", description: DESCRIPTION },
};

const BLUR_FADE_DELAY = 0.04;

export default function MessagePage() {
  return (
    <section id="message" className="flex flex-col gap-12">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          aria-label={`${DATA.name}, back to home`}
          className="group mb-10 inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Avatar className="size-11 border shadow ring-2 ring-muted transition-shadow group-hover:ring-border">
            <AvatarImage alt="" src={DATA.avatarUrl} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col leading-tight">
            <span className="font-medium">{DATA.name}</span>
            <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              ← Home
            </span>
          </span>
        </Link>
        <h1 className="text-xl tracking-tight text-muted-foreground sm:text-2xl">
          write or draw me a message <strong className="font-semibold text-foreground">anonymously</strong>.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No names, no sign-in. Only the words or the drawing you send are kept.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <WriteMessage />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <DrawMessage />
      </BlurFade>
    </section>
  );
}
