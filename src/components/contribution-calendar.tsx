"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVEL_CLASSES = [
  "bg-[#ebedf0] dark:bg-[#1f2328]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDay(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatDay(date: string) {
  return parseDay(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

interface Props {
  contributions: ContributionDay[];
  total: number | null;
}

export function ContributionCalendar({ contributions, total }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ left: false, right: false });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  // Group days into Sunday-first week columns, padding the first week.
  const weeks = useMemo(() => {
    if (contributions.length === 0) return [];
    const padded: (ContributionDay | null)[] = [
      ...Array(parseDay(contributions[0].date).getUTCDay()).fill(null),
      ...contributions,
    ];
    const result: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      result.push(padded.slice(i, i + 7));
    }
    return result;
  }, [contributions]);

  const monthLabels = useMemo(
    () =>
      weeks.map((week, i) => {
        const first = week.find(Boolean);
        if (!first || i > weeks.length - 3) return null;
        const month = parseDay(first.date).getUTCMonth();
        const prevFirst = i > 0 ? weeks[i - 1].find(Boolean) : null;
        if (prevFirst && parseDay(prevFirst.date).getUTCMonth() === month) return null;
        if (i === 0 && parseDay(first.date).getUTCDate() > 7) return null;
        return MONTHS[month];
      }),
    [weeks],
  );

  const updateFade = () => {
    const el = scrollRef.current;
    if (!el) return;
    setFade({
      left: el.scrollLeft > 2,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
    });
  };

  // Start scrolled to the most recent week on narrow screens.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    updateFade();
  }, [weeks]);

  if (weeks.length === 0) {
    return (
      <div className="h-[140px] rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
        Contribution graph unavailable right now.
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-linear-to-r from-background to-transparent transition-opacity duration-200",
            fade.left ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-linear-to-l from-background to-transparent transition-opacity duration-200",
            fade.right ? "opacity-100" : "opacity-0",
          )}
        />
        <div ref={scrollRef} onScroll={updateFade} className="overflow-x-auto scrollbar-none">
          <div className="min-w-[540px]">
            <div
              className="grid gap-[3px] mb-1.5 text-[10px] text-muted-foreground"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
            >
              {monthLabels.map((label, i) => (
                <span key={i} className="whitespace-nowrap h-3 leading-3">
                  {label}
                </span>
              ))}
            </div>
            <div
              className="grid grid-rows-7 grid-flow-col gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
              onMouseLeave={() => setTooltip(null)}
            >
              {weeks.flatMap((week, wi) =>
                Array.from({ length: 7 }, (_, di) => {
                  const day = week[di];
                  if (!day) return <div key={`${wi}-${di}`} className="aspect-square" />;
                  const label = `${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDay(day.date)}`;
                  return (
                    <div
                      key={day.date}
                      aria-label={label}
                      className={cn(
                        "aspect-square rounded-[2px] outline-1 -outline-offset-1 outline-black/5 dark:outline-white/5",
                        LEVEL_CLASSES[day.level],
                      )}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({ x: rect.left + rect.width / 2, y: rect.top, text: label });
                      }}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          {total !== null && (
            <span className="text-foreground text-sm font-semibold tabular-nums mr-1">
              {total.toLocaleString("en-US")}
            </span>
          )}
          contributions in the last year
        </span>
        <span className="flex items-center gap-1">
          Less
          {LEVEL_CLASSES.map((cls) => (
            <span key={cls} className={cn("size-2.5 rounded-[2px]", cls)} />
          ))}
          More
        </span>
      </div>
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-[11px] leading-tight rounded-md bg-primary text-primary-foreground pointer-events-none whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%) translateY(-6px)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
