#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get note slug from command line arguments
const noteSlug = process.argv[2];

if (!noteSlug) {
  console.error('Error: Please provide a note slug');
  console.log('Usage: pnpm create-note "my-note-slug"');
  process.exit(1);
}

// Validate slug format (lowercase, hyphens only)
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
if (!slugRegex.test(noteSlug)) {
  console.error('Error: Invalid slug format. Use lowercase letters, numbers, and hyphens only.');
  console.log('Example: "my-new-note"');
  process.exit(1);
}

const contentDir = path.join(process.cwd(), 'content');
// Images for a note live in public/notes/<slug>/ and are referenced as /notes/<slug>/<file>
const imagesDir = path.join(process.cwd(), 'public/notes', noteSlug);
const noteFilePath = path.join(contentDir, `${noteSlug}.mdx`);

if (fs.existsSync(noteFilePath)) {
  console.error(`Error: ${noteFilePath} already exists`);
  process.exit(1);
}

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

const title = noteSlug
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const noteTemplate = `---
title: "${title}"
publishedAt: "${new Date().toISOString().split('T')[0]}"
summary: "One or two sentences shown on the blog cards."
# image: "/notes/${noteSlug}/banner.jpg"
---

Write your note content here...

![Alt text](/notes/${noteSlug}/image.png)
`;

fs.writeFileSync(noteFilePath, noteTemplate, 'utf8');

console.log(`✅ Created note: ${noteSlug}`);
console.log(`   Note file: ${noteFilePath}`);
console.log(`   Images folder: ${imagesDir}`);
console.log(`\n📝 Next steps:`);
console.log(`   1. Edit the title, summary and content in ${noteFilePath}`);
console.log(`   2. Add images to ${imagesDir} and reference them as /notes/${noteSlug}/<file>`);
console.log(`   3. Uncomment the image line in the frontmatter to set a banner`);
