import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Single-owner auth for the /c-messages inbox. The password lives only in the
// MESSAGES_PASSWORD env var; sessions are signed with it, so changing the
// password signs every device out.

export const INBOX_PATH = "/c-messages";
export const SESSION_COOKIE = "c_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds

const sha256 = (value: string) => createHash("sha256").update(value).digest();

function secret() {
  return process.env.MESSAGES_PASSWORD || null;
}

function sign(expires: number, key: string) {
  return createHmac("sha256", key).update(`inbox:${expires}`).digest("base64url");
}

export function passwordMatches(input: string) {
  const key = secret();
  // Hashing first gives equal-length buffers, so the comparison takes constant time.
  return key !== null && timingSafeEqual(sha256(input), sha256(key));
}

export function createSession() {
  const key = secret();
  if (!key) throw new Error("MESSAGES_PASSWORD is not set");
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${sign(expires, key)}`;
}

export async function isAuthed() {
  const key = secret();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!key || !token) return false;

  const [expires, signature] = token.split(".");
  if (!signature || !(Number(expires) > Date.now())) return false;

  const expected = Buffer.from(sign(Number(expires), key));
  const given = Buffer.from(signature);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
