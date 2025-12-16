"use client"

import { Smartphone } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()

  return (
    <div className="flex px-5 py-1 justify-between items-center border-b">
      <Button className="flex gap-2 items-center" variant="ghost">
        <Smartphone size={20} />
        <p className="text-sm font-primary">Download Gebeya App</p>
      </Button>

      <div className="flex items-center">
        <Button variant="ghost">About Gebeya</Button>
        <Button variant="ghost">Give a Star</Button>
        <Button variant="ghost">Contact</Button>

        <Button
          variant="ghost"
          onClick={() => router.push("/register")}
        >
          Sign Up
        </Button>

        <Button onClick={() => router.push("/login")}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Header
