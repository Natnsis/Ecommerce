import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/utils/supabase/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const id = body?.id;
    const access_token = body?.access_token;
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

    // If an access_token is provided, validate it belongs to `id` to avoid arbitrary upserts.
    if (access_token) {
      const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      try {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (!res.ok)
          return NextResponse.json({ error: "invalid token" }, { status: 401 });
        const user = await res.json();
        if (user?.id !== id)
          return NextResponse.json(
            { error: "token does not match id" },
            { status: 401 }
          );
      } catch (err) {
        console.error("token validation failed", err);
        return NextResponse.json(
          { error: "token validation failed" },
          { status: 401 }
        );
      }
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from("profiles")
      .upsert({ id, role: "CUSTOMER" }, { onConflict: "id" });
    if (error) {
      console.error("profiles/upsert failed", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("profiles/upsert unexpected error", err);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
