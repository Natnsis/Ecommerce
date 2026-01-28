import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

const supabase = createClient()

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async (): Promise<User | null> => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session?.user ?? null
    },
    staleTime: Infinity,
  })
}
