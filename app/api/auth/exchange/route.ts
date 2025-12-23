import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = body?.code || null;
    if (!code)
      return NextResponse.json({ error: "missing code" }, { status: 400 });

    const supabase = createServerClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("exchangeCodeForSession failed", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // return the session (access and refresh tokens) to the client so it can set session
    return NextResponse.json({ session: data.session });
  } catch (err) {
    console.error("auth/exchange unexpected error", err);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
