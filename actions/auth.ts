"use server"

import { createClient } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const login = async (formData: FormData) => {
  const supabase = createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.error(error);
    redirect('/login')
  }
  revalidatePath('/', 'layout');
  redirect('/AdminDashboard')
}

export const register = async (formData: FormData) => {
  const supabase = createClient()
}
