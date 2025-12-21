"use server"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const registerWithPassword = async (formData: FormData): Promise<void> => {
  const email = formData.get('email')?.toString() as string;
  const password = formData.get('password')?.toString() as string;
  const supabase = createClient(cookies())

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "customer"
      }
    }
  });

  if (error) throw error
  console.log("user registerd successfully")
}

export const loginWithPassword = async (formData: FormData): Promise<void> => {
  const email = formData.get("email")?.toString()!;
  const password = formData.get("password")?.toString()!;
  const supabase = createClient(cookies());

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

};
