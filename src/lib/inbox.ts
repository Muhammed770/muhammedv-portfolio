import { get, list, type ListBlobResultBlob } from "@vercel/blob";

export type InboxItem =
  | { kind: "text"; id: string; uploadedAt: Date; text: string }
  | { kind: "drawing"; id: string; uploadedAt: Date; file: string };

const MAX_ITEMS = 200;

async function listAll(prefix: string) {
  const blobs: ListBlobResultBlob[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor });
    blobs.push(...page.blobs);
    cursor = page.cursor;
  } while (cursor);
  return blobs;
}

async function readText(pathname: string) {
  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) return "";
  return new Response(result.stream).text();
}

// Newest first, across both folders.
export async function getInbox(): Promise<InboxItem[]> {
  const [messages, drawings] = await Promise.all([listAll("messages/"), listAll("drawings/")]);
  const newest = [...messages, ...drawings]
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .slice(0, MAX_ITEMS);

  return Promise.all(
    newest.map(async (blob): Promise<InboxItem> => {
      if (blob.pathname.startsWith("drawings/")) {
        return {
          kind: "drawing",
          id: blob.pathname,
          uploadedAt: blob.uploadedAt,
          file: blob.pathname.slice("drawings/".length),
        };
      }
      return { kind: "text", id: blob.pathname, uploadedAt: blob.uploadedAt, text: await readText(blob.pathname) };
    })
  );
}
