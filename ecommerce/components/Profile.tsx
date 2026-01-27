"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Logout } from "@/app/conrollers/auth.controller"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "./ui/spinner"

const Profile = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem
            onClick={logout}>{isLoading ?
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
