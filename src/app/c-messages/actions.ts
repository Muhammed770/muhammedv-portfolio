"use server";

import { checkBotId } from "botid/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  INBOX_PATH,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSession,
  passwordMatches,
} from "@/lib/inbox-auth";

const FAILED_LOGIN_DELAY_MS = 1000;

export async function login(formData: FormData) {
  const { isBot } = await checkBotId();
  const password = formData.get("password");

  if (isBot || typeof password !== "string" || !passwordMatches(password)) {
    // Slows down guessing without telling a bot which check failed.
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    redirect(`${INBOX_PATH}?error=1`);
  }

  (await cookies()).set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: INBOX_PATH,
    maxAge: SESSION_MAX_AGE,
  });
  redirect(INBOX_PATH);
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: INBOX_PATH });
  redirect(INBOX_PATH);
}
