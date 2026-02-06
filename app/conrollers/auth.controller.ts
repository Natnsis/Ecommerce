import { createClient } from "@/lib/supabase/client"
import { AuthTypes } from "../schemas/auth.schema";

export const LoginWithEmail = async (data: AuthTypes) => {
  try {
    const supabase = createClient()
    const { email, password } = data
    const { data: userData, error: LoginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (LoginError) throw LoginError;
    const id = userData.user?.id
    const { data: userRole, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", id)
      .single()
    if (profileError) throw profileError
    return userRole
  } catch (error) {
    throw error
  }
}

export const RegisterWithEmail = async (data: AuthTypes) => {
  try {
    const supabase = createClient()
    const { email, password } = data
    const { data: userData, error: RegisterError } = await supabase.auth.signUp({
      email,
      password
    })
    if (RegisterError) throw RegisterError
    const user_id = userData.user?.id
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id,
        role: "customer"
      })
    if (profileError) throw profileError;
  } catch (error) {
    throw error
  }
}

export const GoogleOAuth = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://ecommerce-1k9egbz78-natnsis-projects.vercel.app/dashboard",
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }
};

export const Logout = async () => {
  try {
    const supabase = createClient();
    const { error: logoutError } = await supabase.auth.signOut()
    if (logoutError) throw logoutError
  } catch (error) {
    throw error;
  }
}
