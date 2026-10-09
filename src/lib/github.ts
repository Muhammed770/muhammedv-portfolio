export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubActivity {
  stars: number | null;
  repos: number | null;
  followers: number | null;
  contributions: ContributionDay[];
  totalContributions: number | null;
}

// Refresh once a day; the page is statically regenerated in the background.
const REVALIDATE = 60 * 60 * 24;

async function getJson<T>(url: string, headers: HeadersInit = {}): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubActivity(username: string): Promise<GithubActivity> {
  // Optional token raises the unauthenticated rate limit (60 req/hour per IP).
  const githubHeaders: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  };

  const [user, repos, calendar] = await Promise.all([
    getJson<{ public_repos: number; followers: number }>(
      `https://api.github.com/users/${username}`,
      githubHeaders
    ),
    getJson<{ stargazers_count: number; fork: boolean }[]>(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
      githubHeaders
    ),
    getJson<{ total: { lastYear?: number }; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    ),
  ]);

  return {
    stars: repos ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) : null,
    repos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
    contributions: calendar?.contributions ?? [],
    totalContributions: calendar?.total?.lastYear ?? null,
  };
}
