"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { MAX_MESSAGE_LENGTH } from "@/lib/message";

type Status = "idle" | "sending" | "sent" | "error";

// The canvas keeps a fixed bitmap and is scaled by CSS, so resizing the window never loses a drawing.
const CANVAS_W = 1500;
const CANVAS_H = 1000;
// Baked into the PNG so the drawing reads the same wherever it is opened.
const PAPER = "#f3eee8";
const INK = "#1c1917";

const BUTTON =
  "rounded-lg border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

async function send(body: BodyInit, contentType: string) {
  const res = await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
}

function fillPaper(canvas: HTMLCanvasElement | null) {
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

function Label({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{children}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function StatusText({ status }: { status: Status }) {
  return (
    <p aria-live="polite" className="font-mono text-xs text-muted-foreground">
      {status === "sent" && "sent. thank you."}
      {status === "error" && "couldn't send that. try again."}
    </p>
  );
}

export function WriteMessage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
          await send(JSON.stringify({ text }), "application/json");
          setText("");
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      <Label>Write</Label>
      <textarea
        aria-label="Your message"
        value={text}
        maxLength={MAX_MESSAGE_LENGTH}
        rows={8}
        placeholder="Type your anonymous message here..."
        onChange={(e) => {
          setText(e.target.value);
          if (status !== "sending") setStatus("idle");
        }}
        className="min-h-48 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 text-base leading-relaxed placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div className="flex items-center gap-4">
        <button type="submit" disabled={!text.trim() || status === "sending"} className={BUTTON}>
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        <StatusText status={status} />
        <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
          {text.length}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>
    </form>
  );
}

export function DrawMessage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(INK);
  const [size, setSize] = useState(2);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => fillPaper(canvasRef.current), []);

  // Maps a pointer to bitmap coordinates. `scale` turns the slider's CSS pixels into bitmap pixels.
  const locate = (e: { clientX: number; clientY: number }) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scale = CANVAS_W / rect.width;
    return { x: (e.clientX - rect.left) * scale, y: (e.clientY - rect.top) * scale, scale };
  };

  const brush = (scale: number) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size * scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    return ctx;
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = locate(e);
    const ctx = brush(p.scale);
    // A tap without a drag still leaves a dot.
    ctx.beginPath();
    ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    last.current = p;
    setDirty(true);
    setStatus("idle");
  };

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!last.current) return;
    // Coalesced events keep fast strokes smooth instead of polygonal.
    const coalesced = e.nativeEvent.getCoalescedEvents?.() ?? [];
    const ctx = brush(locate(e).scale);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    for (const ev of coalesced.length ? coalesced : [e.nativeEvent]) {
      const p = locate(ev);
      ctx.lineTo(p.x, p.y);
      last.current = p;
    }
    ctx.stroke();
  };

  const endStroke = () => {
    last.current = null;
  };

  const clear = () => {
    fillPaper(canvasRef.current);
    setDirty(false);
  };

  const submit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setStatus("sending");
    try {
      const png = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/png")
      );
      await send(png, "image/png");
      clear();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label>Draw</Label>
      <div className="flex items-center gap-4">
        <input
          type="color"
          aria-label="Pen colour"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          // Sits on the paper colour so dark inks stay visible in dark mode.
          style={{ backgroundColor: PAPER }}
          className="h-8 w-10 shrink-0 cursor-pointer rounded-md border border-border p-1 [&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0"
        />
        <input
          type="range"
          aria-label="Pen size"
          min={1}
          max={24}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-muted [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-muted-foreground [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-muted-foreground"
        />
        <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
          {size}px
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          role="img"
          aria-label="Drawing canvas"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
          className="block aspect-[3/2] w-full cursor-crosshair touch-none"
          style={{ backgroundColor: PAPER }}
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={submit} disabled={!dirty || status === "sending"} className={BUTTON}>
          {status === "sending" ? "Sending..." : "Send drawing"}
        </button>
        <StatusText status={status} />
        <button
          type="button"
          onClick={clear}
          disabled={!dirty || status === "sending"}
          className="ml-auto font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
