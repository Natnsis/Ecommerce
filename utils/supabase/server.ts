import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer the publishable key name used elsewhere in the app, fall back to anon key
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type CookieStoreLike = {
  getAll?: () => unknown;
  set?: (name: string, value: string, options?: unknown) => void;
};

export const createClient = (cookieStore?: unknown) => {
  const cookieStoreToUse = cookieStore ?? cookies();
  const cs = cookieStoreToUse as CookieStoreLike;

  const getAllFn: () =>
    | { name: string; value: string; options?: unknown }[]
    | null = () => {
    if (typeof cs.getAll === "function") {
      const res = cs.getAll!();
      if (Array.isArray(res))
        return res as { name: string; value: string; options?: unknown }[];
    }
    return [];
  };

  const setFn: (
    cookiesToSet: { name: string; value: string; options?: unknown }[]
  ) => void = (cookiesToSet) => {
    if (typeof cs.set === "function") {
      cookiesToSet.forEach(({ name, value, options }) =>
        cs.set!(name, value, options)
      );
    }
  };

  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return getAllFn();
      },
      setAll(cookiesToSet) {
        try {
          setFn(cookiesToSet);
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
