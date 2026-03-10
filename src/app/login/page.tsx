import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "./actions";

interface Props {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: Props) {
  const params = (searchParams && typeof (searchParams as Promise<unknown>)?.then === "function")
    ? await (searchParams as Promise<Record<string, string | string[] | undefined>>)
    : (searchParams ?? {});
  const error = params.error === "1";
  const missing = params.missing === "1";
  const nextPath = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={login} className="space-y-4">
              <input type="hidden" name="next" value={nextPath} />
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input name="password" type="password" placeholder="Password" required />
              </div>
              <Button type="submit">Sign In</Button>
              {error && (
                <p className="text-sm text-red-500">
                  Invalid password.
                </p>
              )}
              {missing && (
                <p className="text-sm text-red-500">
                  DASHBOARD_PASSWORD is not configured.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
