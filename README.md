## Portfolio

Personal site of Muhammed Vengalath, live at [muhammedvengalath.vercel.app](https://muhammedvengalath.vercel.app).

Built on the [Magic UI portfolio template](https://github.com/dillionverma/portfolio) (Next.js, Tailwind CSS, shadcn/ui, Motion), with a GitHub activity section and notes cards on the home page. Deployed on Vercel.

```bash
pnpm i
pnpm dev
```

### Editing content

- **Profile, work, education, skills, projects:** [`src/data/resume.tsx`](./src/data/resume.tsx)
- **Project cover images:** `public/projects/`
- **Notes:** MDX files in [`content/`](./content), images in `public/notes/<slug>/`. Create a new one with:

  ```bash
  pnpm create-note "my-note-slug"
  ```

### GitHub section

Stars, repos and followers come from the GitHub REST API, and the contribution graph from [github-contributions-api](https://github.com/grubersjoe/github-contributions-api). Both are cached and refreshed once a day. Set a `GITHUB_TOKEN` environment variable on Vercel if the unauthenticated rate limit is ever hit.
