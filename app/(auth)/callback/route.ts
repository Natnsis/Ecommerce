import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(origin + "/login");
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (c) =>
          c.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          ),
      },
    }
  );

  // 🔑 create session
  const { data: sessionData } =
    await supabase.auth.exchangeCodeForSession(code);

  if (!sessionData?.session) {
    return NextResponse.redirect(origin + "/login");
  }

  // 🔍 read role from DB
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .single();

  // 🚦 redirect based on role
  if (profile?.role === "admin") {
    return NextResponse.redirect(origin + "/admin");
  }

  return NextResponse.redirect(origin + "/dashboard");
}
