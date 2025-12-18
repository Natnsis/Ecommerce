"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const signupPassword = async (formData: FormData) => {
  const supabase = await createClient();
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()

  if (!email || !password) {
    redirect('/auth/signup?error=missing_fields')
  }

  if (password.length < 6) {
    redirect('/auth/signup?error=password_too_short')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${SITE_URL}/login`
    }
  });

  if (error) {
    console.error('sign up error:', error);
    redirect('/register')
  }

}

export const loginWithGoogle = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${SITE_URL}/callback`
    }
  });

  if (error || !data.url) {
    redirect('/auth/login?error=oauth_failed')
  }

  redirect(data.url)
}


export const loginWithPassword = async (formData: FormData) => {
  const supabase = await createClient();
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    redirect('/auth/login?error=missing_credentials')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("error while logging in:", error)
    redirect('/login')
  }

  redirect('/ClientDashboard')
}

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login')
}
