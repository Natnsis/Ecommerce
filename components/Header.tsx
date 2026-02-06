"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserIcon, ListIcon, DeviceMobileIcon } from "@phosphor-icons/react"
import { ModeToggle } from "@/components/mode-toggle"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StarIcon } from "lucide-react"

const Header = () => {
  const router = useRouter()
  const supabase = createClient()
  const [href, setHref] = useState("/auth/login")
  const [label, setLabel] = useState("Sign In")

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single()

      if (profile?.role === "admin") {
        setHref("/admin")
        setLabel("Admin")
      } else {
        setHref("/dashboard")
        setLabel("Dashboard")
      }
    }

    loadUser()
  }, [])

  return (
    <header className="flex justify-between gap-5 items-center">
      {/* LEFT */}
      <div className="flex items-center">
        <Image src="/gebeya-logo.png" alt="logo" width={50} height={40} />
        <h1 className="text-2xl font-bold">Gebeya</h1>
      </div>

      <div className="text-lg gap-5 hidden md:block">
        <Button variant="link"><a href="#home">HOME</a></Button>
        <Button variant="link"><a href="#about">ABOUT</a></Button>
        <Button variant="link"><a href="mailto:nsisay49@gmail.com">CONTACT US</a></Button>
      </div>

      <div className="gap-5 hidden md:flex">
        <Button variant="outline">
          <DeviceMobileIcon />
          Get The App
        </Button>

        <Button variant="secondary">
          <a
            href="https://github.com/Natnsis/Ecommerce"
            className="flex items-center gap-2"
          >
            <StarIcon />
            Give A Star
          </a>
        </Button>

        <ModeToggle />

        <Button onClick={() => router.push(href)}>
          <UserIcon size={32} />
          <p>{label}</p>
        </Button>
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>HOME</DropdownMenuItem>
              <DropdownMenuItem>ABOUT</DropdownMenuItem>
              <DropdownMenuItem>CONTACT US</DropdownMenuItem>

              <DropdownMenuItem>
                <DeviceMobileIcon />
                Get The App
              </DropdownMenuItem>

              <DropdownMenuItem>
                <a href="https://github.com/Natnsis/Ecommerce">
                  <StarIcon />
                  Give A Star
                </a>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push(href)}>
                <UserIcon size={32} />
                <p>{label}</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
