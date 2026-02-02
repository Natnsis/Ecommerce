"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { UserIcon, ListIcon, DeviceMobileIcon } from "@phosphor-icons/react";
import Language from '@/components/Language';
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StarIcon } from 'lucide-react';

const Header = () => {
  const router = useRouter();
  return (
    <header className='flex justify-between gap-5 items-center'>
      <div className='flex items-center'>
        <Image src="/gebeya-logo.png" alt='logo' width={50} height={40} />
        <h1 className='text-2xl font-bold'>Gebeya</h1>
      </div>
      <div className='text-lg  gap-5 hidden md:block'>
        <Button variant="link"><a href='#home'>HOME</a></Button>
        <Button variant="link"><a href='#about'>ABOUT</a></Button>
        <Button variant="link"><a href='mailto:nsisay49@gmail.com'>CONTACT US</a></Button>
      </div>
      <div className='gap-5 hidden md:flex'>
        <Button variant="outline">
          <DeviceMobileIcon />
          Get The App
        </Button>
        <Button variant="secondary">
          <StarIcon />
          Give A Star
        </Button>
        <Language />
        <ModeToggle />
        <Button onClick={() => router.push("/auth/login")}>
          <UserIcon size={32} />
          <p>Sign In</p>
        </Button>
      </div>

      <div className='md:hidden'>
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
                <StarIcon />
                Give A Star
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/auth/login")}
              >
                <UserIcon size={32} />
                <p>Sign In</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
