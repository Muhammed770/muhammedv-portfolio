import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NoteMetadata {
  slug: string;
  title: string;
  date: string;
  folderName: string;
  bannerImage?: string;
}

const notesDirectory = path.join(process.cwd(), 'src/content/notes');

// Extract number prefix from folder name (e.g., "001-note-name" -> 1)
function extractNoteNumber(folderName: string): number {
  const match = folderName.match(/^(\d{3})-/);
  return match ? parseInt(match[1], 10) : 0;
}

// Strip number prefix from folder name to get clean slug (e.g., "001-note-name" -> "note-name")
function getSlugFromFolder(folderName: string): string {
  return folderName.replace(/^\d{3}-/, '');
}

export function getAllNotes(): NoteMetadata[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(notesDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const notes: NoteMetadata[] = [];

  for (const folder of folders) {
    const notePath = path.join(notesDirectory, folder, 'note.md');
    
    if (fs.existsSync(notePath)) {
      const fileContents = fs.readFileSync(notePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract title from first heading or use folder name
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : folder.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      // Extract date from frontmatter or file stats
      const date = data.date || data.published || 
        fs.statSync(notePath).mtime.toISOString().split('T')[0];

      // Extract banner image from frontmatter
      const bannerImage = data.bannerImage || data.banner;

      // Get clean slug without number prefix
      const slug = getSlugFromFolder(folder);

      notes.push({
        slug,
        title,
        date,
        folderName: folder,
        bannerImage,
      });
    }
  }

  // Sort by number (descending - highest number first), then by date as fallback
  return notes.sort((a, b) => {
    const numA = extractNoteNumber(a.folderName);
    const numB = extractNoteNumber(b.folderName);
    if (numA !== numB) {
      return numB - numA; // Descending order (highest first)
    }
    // If numbers are equal (shouldn't happen), fall back to date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getNoteBySlug(slug: string): { content: string; metadata: NoteMetadata } | null {
  // Find folder that matches the slug (with or without number prefix)
  const folders = fs.readdirSync(notesDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Try to find folder by slug (without prefix) or by exact match
  const folder = folders.find(f => {
    const folderSlug = getSlugFromFolder(f);
    return folderSlug === slug || f === slug;
  });

  if (!folder) {
    return null;
  }

  const notePath = path.join(notesDirectory, folder, 'note.md');
  
  if (!fs.existsSync(notePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(notePath, 'utf8');
  const { data, content } = matter(fileContents);

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Remove the first H1 heading from content if it exists (since we display title separately)
  let processedContent = content;
  if (titleMatch) {
    // Remove the first H1 line and any following blank lines
    processedContent = content.replace(/^#\s+.+$/m, '').replace(/^\n+/, '');
  }

  const date = data.date || data.published || 
    fs.statSync(notePath).mtime.toISOString().split('T')[0];

  // Extract banner image from frontmatter
  const bannerImage = data.bannerImage || data.banner;

  // Get clean slug without number prefix
  const cleanSlug = getSlugFromFolder(folder);

  return {
    content: processedContent,
    metadata: {
      slug: cleanSlug,
      title,
      date,
      folderName: folder,
      bannerImage,
    },
  };
}

export function getNoteImagePath(folderName: string, imageName: string): string {
  return `/notes/${folderName}/${imageName}`;
}

