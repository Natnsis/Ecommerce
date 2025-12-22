import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/CustomerDashboard";

  if (code) {
    try {
      // Create a supabase client that can exchange the code for a session
      const cookieHeader = request.headers.get("cookie") || "";
      const supabase = createServerClient(SUPABASE_URL, SERVICE_KEY, {
        cookies: {
          getAll() {
            return cookieHeader
              .split(/;\s*/)
              .filter(Boolean)
              .map((c) => ({
                name: c.split("=")[0],
                value: c.split("=").slice(1).join("="),
              }));
          },
          setAll() {
            /* noop */
          },
        },
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("oauth exchange failed", error);
        return NextResponse.redirect(`${origin}/auth/error`);
      }

      // ensure we have a profile for this oauth user and redirect appropriately
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // check if this login came from Google
        const isGoogle = !!user?.identities?.some(
          (i: any) => i.provider === "google"
        );

        // fetch existing profile (if any)
        const { data: existing } = await supabase
          .from("profiles")
          .select("role")
          .eq("userId", user.id)
          .limit(1)
          .maybeSingle();

        if (!existing) {
          await supabase
            .from("profiles")
            .insert({ userId: user.id, role: "CUSTOMER" });
        }

        // If signed in via Google, always send to Customer Dashboard.
        if (isGoogle) {
          return NextResponse.redirect(`${origin}/CustomerDashboard`);
        }

        // Otherwise (unlikely for oauth here), use profile role if present
        const role = existing?.role ?? null;
        if (role === "ADMIN")
          return NextResponse.redirect(`${origin}/AdminDashboard`);
        if (role === "VENDOR")
          return NextResponse.redirect(`${origin}/VendorDashboard`);
      }

      return NextResponse.redirect(`${origin}/CustomerDashboard`);
    } catch (e) {
      console.error("callback handler failed", e);
      return NextResponse.redirect(`${origin}/auth/error`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
