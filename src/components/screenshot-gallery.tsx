"use client";

/* eslint-disable @next/next/no-img-element */
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";

interface Shot {
  src: string;
  full: string;
  alt: string;
}

const SWIPE_PX = 50;

const CONTROL =
  "rounded-full border border-border bg-background/80 p-2 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ScreenshotGallery({ shots }: { shots: readonly Shot[] }) {
  const [open, setOpen] = useState(false);
  // Kept after closing so the image stays put during the fade-out.
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const shot = shots[index];

  const step = (delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="grid grid-cols-3 gap-3">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`View full screen: ${s.alt}`}
            onClick={() => {
              for (const other of shots) new Image().src = other.full;
              setIndex(i);
              setOpen(true);
            }}
            className="group overflow-hidden rounded-lg border border-border cursor-zoom-in transition-shadow hover:ring-2 hover:ring-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={s.src}
              alt=""
              loading="lazy"
              className="aspect-[1200/630] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 px-4 py-16 outline-none sm:px-20 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          // The content covers the viewport, so a click on its empty area counts as outside.
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > SWIPE_PX) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <Dialog.Title className="sr-only">{shot.alt}</Dialog.Title>
          <img
            key={shot.full}
            src={shot.full}
            alt={shot.alt}
            className="max-h-[calc(100dvh-10rem)] w-auto max-w-full object-contain drop-shadow-xl animate-in fade-in-0 duration-300"
          />
          <p className="text-sm text-muted-foreground tabular-nums">
            {shot.alt} · {index + 1} / {shots.length}
          </p>

          <Dialog.Close
            aria-label="Close"
            className={`absolute top-4 right-4 ${CONTROL}`}
          >
            <X className="size-5" />
          </Dialog.Close>
          {shots.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() => step(-1)}
                className={`absolute bottom-6 left-[calc(50%-3.25rem)] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:left-5 ${CONTROL}`}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => step(1)}
                className={`absolute bottom-6 right-[calc(50%-3.25rem)] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:right-5 ${CONTROL}`}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
