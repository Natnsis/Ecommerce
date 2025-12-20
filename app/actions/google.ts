"use client";

import { createClient } from "@/lib/supabase/client";

export const signUpWithGoogle = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.message);
  }
};
