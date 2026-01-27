import { createClient } from "@/lib/supabase/client"
import { AuthTypes } from "../schemas/auth.schema";

export const LoginWithEmail = async (data: AuthTypes) => {
  try {
    const supabase = createClient()
    const { email, password } = data
    const { error: LoginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (LoginError) throw LoginError;
  } catch (error) {
    throw error
  }
}

export const RegisterWithEmail = async (data: AuthTypes) => {
  try {
    const supabase = createClient()
    const { email, password } = data
    const { error: RegisterError } = await supabase.auth.signUp({
      email,
      password
    })
    if (RegisterError) throw RegisterError
  } catch (error) {
    throw error
  }
}

export const GoogleOAuth = async () => {
  try {
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "${window.location.origin}"
      }
    })
    if (authError) throw authError
  } catch (error) {
    throw error
  }
}
