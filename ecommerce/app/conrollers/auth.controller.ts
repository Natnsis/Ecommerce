import { createClient } from "@/lib/supabase/client"

export const LoginWithEmail = async (data) => {
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

export const RegisterWithEmail = async (data) => {
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
