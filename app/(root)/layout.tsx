"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const layout = ({ children }: { children: React.ReactNode }) => {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default layout
