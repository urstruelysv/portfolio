"use server";

import { redirect } from "next/navigation";
import { clearAuthCookie, setAuthCookie, validatePassword } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/dashboard");

  if (!validatePassword(password)) {
    const params = new URLSearchParams({ next: nextPath, error: "1" });
    redirect(`/login?${params.toString()}`);
  }

  if (!(await setAuthCookie())) {
    const params = new URLSearchParams({ next: nextPath, missing: "1" });
    redirect(`/login?${params.toString()}`);
  }

  redirect(nextPath);
}

export async function logout() {
  await clearAuthCookie();
  redirect("/login");
}
