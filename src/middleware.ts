import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "dashboard_auth";

async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD ?? "";
  if (!password) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  const expected = await sha256(password);
  if (token !== expected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
