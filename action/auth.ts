import { supabase } from "@/utils/supabase/client";

export const loginWithPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
}

export const registerWithPassword = async (email: string, password: string) => {
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password
  })
  if (signUpError) throw signUpError
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/CustomerDashboard",
    }
  });
  if (error) throw error
}
