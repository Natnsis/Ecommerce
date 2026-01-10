import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const fetchProfile = async () => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    return profile;
  } catch (e) {
    console.error("Fetch profile failed:", e);
    return null;
  }
};

export const updateProfile = async (updates: {
  username?: string;
  avatar_url?: string;
  full_name?: string;
}) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("profile")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error("update profile failed:", e);
    return null;
  }
};
