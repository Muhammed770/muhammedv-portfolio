# Notes Directory

This directory contains all your notes. Each note is stored in its own folder.

## Structure

```
notes/
  └── note-folder-name/
      ├── note.md          # The markdown file containing your note
      └── images/          # Optional: images for this note
          └── image.png
```

## Adding a New Note

1. Create a new folder with a slug-friendly name (e.g., `my-new-note`)
2. Create a `note.md` file inside the folder
3. Write your markdown content. The first `# Heading` will be used as the title
4. Optionally add images in an `images/` subfolder
5. Copy images to `public/notes/[folder-name]/` for them to be accessible

## Note Format

Your `note.md` file can include:

- Frontmatter (optional):
  ```markdown
  ---
  date: 2025-01-15
  published: 2025-01-15
  ---
  ```

- Markdown content with:
  - Headings (# ## ###)
  - Code blocks
  - Images
  - Links
  - Lists
  - Blockquotes

## Example

```
notes/
  └── getting-started-with-nextjs-16/
      ├── note.md
      └── (images go in public/notes/getting-started-with-nextjs-16/)
```

## Images

To include images in your notes:

1. Place images in `public/notes/[note-folder-name]/` directory
2. Reference them in markdown as: `![alt text](./image-name.png)`
3. The markdown renderer will automatically resolve the path to `/notes/[note-folder-name]/image-name.png`

