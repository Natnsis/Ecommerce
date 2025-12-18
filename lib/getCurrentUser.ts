import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'  // Your Prisma client

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, profile: null, role: null }
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      bio: true,
      phoneNumber: true,
      address: true,
    },
  })

  return {
    user,
    profile,
    role: profile?.role as 'ADMIN' | 'VENDOR' | 'CUSTOMER' | null,
  }
}
