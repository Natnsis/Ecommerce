import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const getCustomersCount = async () => {
  try {
    const role = 'customer'
    const { count, error: countError } = await supabase.from('profiles')
      .select("*", { count: 'exact', head: true })
      .eq("role", role)
    if (countError) throw countError
    return count
  } catch (error) {
    throw error
  }
}

