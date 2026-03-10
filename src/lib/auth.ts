import { cookies } from "next/headers";
import crypto from "crypto";
import { redirect } from "next/navigation";

const COOKIE_NAME = "dashboard_auth";

function getPassword() {
  return process.env.DASHBOARD_PASSWORD ?? "";
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function isAuthenticated() {
  const password = getPassword();
  if (!password) return false;
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === hashPassword(password);
}

export function requireAuthForPage(nextPath = "/dashboard") {
  if (!isAuthenticated()) {
    const params = new URLSearchParams({ next: nextPath });
    redirect(`/login?${params.toString()}`);
  }
}

export function requireAuthForAction() {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized");
  }
}

export function validatePassword(input: string) {
  const password = getPassword();
  if (!password) return false;
  const inputHash = hashPassword(input);
  const expected = hashPassword(password);
  try {
    return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function setAuthCookie() {
  const password = getPassword();
  if (!password) return false;
  const token = hashPassword(password);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return true;
}

export function clearAuthCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
