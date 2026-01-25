"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, UserIcon } from "@phosphor-icons/react";
import Language from '@/components/Language';
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation"
const Header = () => {
  const router = useRouter();
  return (
    <header className='flex justify-between gap-5 items-center'>
      <div className='flex items-center'>
        <Image src="/gebeya-logo.png" alt='logo' width={50} height={40} />
        <h1 className='text-2xl font-bold'>Gebeya</h1>
      </div>
      <div className='text-lg flex gap-5'>
        <Button variant="link">HOME</Button>
        <Button variant="link">ABOUT</Button>
        <Button variant="link">CONTACT US</Button>
      </div>
      <div className='flex gap-5'>
        <Button variant="outline">
          <ShoppingCartIcon size={32} />
        </Button>
        <Language />
        <ModeToggle />
        <Button onClick={() => router.push("/auth/login")}>
          <UserIcon size={32} />
          <p>Sign In</p>
        </Button>
      </div>


    </header>
  )
}

export default Header
