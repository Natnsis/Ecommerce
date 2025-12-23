import { createClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase admin client using the service role key.
 * This factory avoids creating the client at module evaluation time so importing
 * the module from client-side code won't throw when the service key is missing.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for server-side operations"
    );
  }
  return createClient(url, key);
}
