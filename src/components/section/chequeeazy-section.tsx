/* eslint-disable @next/next/no-img-element */
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import SectionHeader from "@/components/section/section-header";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

export default function ChequeEazySection() {
  const { chequeeazy } = DATA;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader
        label={chequeeazy.label}
        title={chequeeazy.title}
        description={chequeeazy.description}
      />

      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-xl border border-border">
          <video
            src={chequeeazy.video}
            poster={chequeeazy.poster}
            autoPlay
            loop
            muted
            playsInline
            aria-label="ChequeEazy promo video"
            className="aspect-video w-full object-cover"
          />
        </div>
        <ScreenshotGallery shots={chequeeazy.screenshots} />
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {chequeeazy.stats.map((stat) => (
          <div
            key={stat.label}
            className="relative flex flex-col items-center gap-1 p-4 rounded-xl border border-border overflow-hidden text-center"
          >
            <div className="absolute inset-0 bottom-auto h-[45%] rounded-xl overflow-hidden">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                maxOpacity={0.15}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <span className="relative text-lg sm:text-2xl font-semibold tracking-tight tabular-nums whitespace-nowrap">
              {stat.value}
            </span>
            <span className="relative text-xs text-muted-foreground text-balance">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5">
        <p className="text-xs text-muted-foreground text-center">{chequeeazy.clientsLabel}</p>
        {/* Logos are flattened to one tone so mixed brand colours read as a set in both themes. */}
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-7">
          {chequeeazy.clients.map((client) => (
            <li key={client.name}>
              <img
                src={client.logo}
                alt={client.name}
                title={client.name}
                className={cn(
                  "w-auto brightness-0 opacity-55 transition-opacity duration-200 hover:opacity-90 dark:invert",
                  client.className,
                )}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-center">What I built</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {chequeeazy.built.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 rounded-xl border border-border p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 flex-none items-center justify-center rounded-md border border-border bg-muted/40">
                  <item.icon className="size-3.5 text-muted-foreground" aria-hidden />
                </span>
                <h4 className="font-semibold text-sm leading-tight">{item.title}</h4>
              </div>
              <p className="text-sm leading-snug text-muted-foreground text-pretty">
                {item.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-1 pt-1">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant="outline"
                    className="h-6 w-fit gap-1 border border-border px-2 text-[11px] font-medium"
                  >
                    {"icon" in tag && <tag.icon className="size-3" />}
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
