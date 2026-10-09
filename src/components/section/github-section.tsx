import { ArrowUpRight, FolderGit2, Star, Users } from "lucide-react";
import { ContributionCalendar } from "@/components/contribution-calendar";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import SectionHeader from "@/components/section/section-header";
import { DATA } from "@/data/resume";
import { getGithubActivity } from "@/lib/github";

export default async function GithubSection() {
  const activity = await getGithubActivity(DATA.github);

  const stats = [
    { label: "Stars", value: activity.stars, icon: <Star className="size-4 fill-amber-400 text-amber-400" /> },
    { label: "Repos", value: activity.repos, icon: <FolderGit2 className="size-4 text-blue-500" /> },
    { label: "Followers", value: activity.followers, icon: <Users className="size-4 text-violet-500" /> },
  ];

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader
        label="Open Source"
        title="Building in public"
        description="Side projects, experiments and hackathon builds. Here's what the last year looks like."
      />
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border overflow-hidden"
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
            <span className="relative">{stat.icon}</span>
            <span className="relative text-2xl font-semibold tracking-tight tabular-nums">
              {stat.value === null ? "–" : stat.value.toLocaleString("en-US")}
            </span>
            <span className="relative text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border p-4">
        <ContributionCalendar
          contributions={activity.contributions}
          total={activity.totalContributions}
        />
      </div>
      <div className="flex justify-center -mt-2">
        <a
          href={`https://github.com/${DATA.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          View on GitHub
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
