import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

const supabase = createClient()

export const useUser = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(
        ["authUser"],
        session?.user ?? null
      )
    })

    return () => subscription.unsubscribe()
  }, [queryClient])

  return useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) throw error
      return session?.user ?? null
    },
    staleTime: Infinity,
  })
}
