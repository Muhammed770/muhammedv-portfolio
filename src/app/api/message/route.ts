import { put } from "@vercel/blob";
import { checkBotId } from "botid/server";
import { MAX_MESSAGE_LENGTH } from "@/lib/message";

const MAX_DRAWING_BYTES = 2 * 1024 * 1024;
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

// Sortable by time and collision-free. Nothing about the sender is stored.
function pathname(folder: string, ext: string) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${folder}/${stamp}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
}

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const { isBot } = await checkBotId();
  if (isBot) return error("Access denied", 403);

  const type = request.headers.get("content-type") ?? "";

  if (type.startsWith("image/png")) {
    if (Number(request.headers.get("content-length")) > MAX_DRAWING_BYTES) {
      return error("Drawing is too large", 413);
    }
    const bytes = await request.arrayBuffer();
    const head = new Uint8Array(bytes, 0, Math.min(bytes.byteLength, PNG_SIGNATURE.length));
    if (bytes.byteLength > MAX_DRAWING_BYTES || !PNG_SIGNATURE.every((b, i) => head[i] === b)) {
      return error("Invalid drawing", 400);
    }
    await put(pathname("drawings", "png"), bytes, {
      access: "private",
      contentType: "image/png",
    });
    return Response.json({ ok: true });
  }

  if (type.startsWith("application/json")) {
    const body = await request.json().catch(() => null);
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    if (!text || text.length > MAX_MESSAGE_LENGTH) return error("Invalid message", 400);
    await put(pathname("messages", "txt"), text, {
      access: "private",
      contentType: "text/plain; charset=utf-8",
    });
    return Response.json({ ok: true });
  }

  return error("Unsupported content type", 415);
}
