import { supabaseAdmin } from "@/lib/supabase/admin"

export async function getAllAuthUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers()

  if (error) {
    throw new Error(error.message)
  }

  return data.users
}
