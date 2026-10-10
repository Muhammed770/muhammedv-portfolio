import { get } from "@vercel/blob";
import { isAuthed } from "@/lib/inbox-auth";

const FILE_PATTERN = /^[\w-]+\.png$/;

function notFound() {
  return new Response("Not found", { status: 404 });
}

// Drawings live in a private store, so the inbox streams them through here behind the session check.
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  if (!(await isAuthed())) return notFound();

  const { file } = await params;
  if (!FILE_PATTERN.test(file)) return notFound();

  const result = await get(`drawings/${file}`, { access: "private" });
  if (!result || result.statusCode !== 200) return notFound();

  return new Response(result.stream, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
