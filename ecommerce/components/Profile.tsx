"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Logout } from "@/app/conrollers/auth.controller"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "./ui/spinner"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

const Profile = () => {
  const router = useRouter()
  const [loading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (!error) setUser(session?.user ?? null)
    }
    fetchUser()
  }, [])


  const logout = async () => {
    try {
      setIsLoading(true)
      await Logout()
      setIsLoading(false)
      toast.success("you've logged out");
      router.push("/auth/login");
    } catch (error) {
      throw error
    }
  }
  return (
    < DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={
              user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"
            }
            alt={user?.email || "User Avatar"}
            className="grayscale"
          />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={logout}>{loading ?
              <span>
                <Spinner />
                logging out...
              </span> : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default Profile
