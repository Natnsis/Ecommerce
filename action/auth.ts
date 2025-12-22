import { supabase } from "@/utils/supabase/client";

export const loginWithPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
}

export const registerWithPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) throw error
} 
