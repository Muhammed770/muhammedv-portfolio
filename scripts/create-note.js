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

const contentNotesDir = path.join(process.cwd(), 'src/content/notes');
const publicNotesDir = path.join(process.cwd(), 'public/notes');

// Ensure directories exist
if (!fs.existsSync(contentNotesDir)) {
  fs.mkdirSync(contentNotesDir, { recursive: true });
}
if (!fs.existsSync(publicNotesDir)) {
  fs.mkdirSync(publicNotesDir, { recursive: true });
}

// Get all existing folders
const existingFolders = fs.readdirSync(contentNotesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Extract numbers from folder names and find the highest
let maxNumber = 0;
existingFolders.forEach(folder => {
  const match = folder.match(/^(\d{3})-/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > maxNumber) {
      maxNumber = num;
    }
  }
});

// Generate next number
const nextNumber = maxNumber + 1;
const paddedNumber = String(nextNumber).padStart(3, '0');
const folderName = `${paddedNumber}-${noteSlug}`;

const contentFolderPath = path.join(contentNotesDir, folderName);
// Public folder uses clean slug without number prefix
const publicFolderPath = path.join(publicNotesDir, noteSlug);

// Check if folder already exists
if (fs.existsSync(contentFolderPath)) {
  console.error(`Error: Folder ${folderName} already exists`);
  process.exit(1);
}

// Create folders
fs.mkdirSync(contentFolderPath, { recursive: true });
fs.mkdirSync(publicFolderPath, { recursive: true });

// Create initial note.md file with template
const noteTemplate = `---
date: ${new Date().toISOString().split('T')[0]}
---

# ${noteSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

Write your note content here...

`;

const noteFilePath = path.join(contentFolderPath, 'note.md');
fs.writeFileSync(noteFilePath, noteTemplate, 'utf8');

console.log(`✅ Created note: ${folderName}`);
console.log(`   Content folder: ${contentFolderPath}`);
console.log(`   Images folder: ${publicFolderPath} (without number prefix)`);
console.log(`   Note file: ${noteFilePath}`);
console.log(`\n📝 Next steps:`);
console.log(`   1. Edit ${noteFilePath}`);
console.log(`   2. Add images to ${publicFolderPath}`);
console.log(`   3. Add bannerImage to frontmatter if needed`);

