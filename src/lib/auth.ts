import { cookies } from "next/headers";
import crypto from "node:crypto";
import { redirect } from "next/navigation";

const COOKIE_NAME = "dashboard_auth";

function getPassword() {
  return process.env.DASHBOARD_PASSWORD ?? "";
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function isAuthenticated() {
  const password = getPassword();
  if (!password) return false;
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === hashPassword(password);
}

export async function requireAuthForPage(nextPath = "/dashboard") {
  if (!(await isAuthenticated())) {
    const params = new URLSearchParams({ next: nextPath });
    redirect(`/login?${params.toString()}`);
  }
}

export async function requireAuthForAction() {
  if (!(await isAuthenticated())) {
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

export async function setAuthCookie() {
  const password = getPassword();
  if (!password) return false;
  const token = hashPassword(password);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return true;
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
