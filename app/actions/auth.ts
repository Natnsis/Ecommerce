import { createClient } from "@/lib/supabase/server"
import { useRouter } from "next/navigation"

type FormData = {
  email: string;
  password: string;
}

type RegisterData = {
  email: string;
  password: string;
  repeatPassword: string;
}

export const loginWithPassword = async (formData: FormData) => {
  const router = useRouter();
  const supabase = await createClient()
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    });
    if (error) {
      console.error("an error has occured", error);
      throw error
    }
    router.push('/CustomerDashboard')

  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : "An error occurred");
  }
}

export const registerWithEmaill = async (formData: RegisterData) => {
  const router = useRouter();
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/CustomerDashboard`,
      }
    })
    if (error) throw error
    router.push('/sign-up-success')
  } catch (e) {
    console.error(e)
  }
}

export const logout = async () => {
  const supabase = await createClient();
  const router = useRouter();
  await supabase.auth.signOut();
  router.push('/login')
}

export const signUpWithGoogle = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
  if (error) {
    console.error("Google sign-in error:", error.message);
  }
};

export const userData = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  return user
}
