"use client"
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { logout } from "@/action/auth";
import { useRouter } from 'next/navigation'
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const Cheader = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
    router.push('/login');
  }
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false)
    })
  });

  if (!user) {
    router.push("/login")
  }
  if (loading) return <div>Loading...</div>;
  return (
    <div className="px-5 py-3 flex justify-between">
      <h1 className="font-quater text-2xl">Gebeya</h1>
      <div className="flex items-center gap-5">
        <Button variant="ghost" className="font-secondary-extrabold text-md">
          HOME
        </Button>
        <Button variant="ghost" className="font-secondary-extrabold text-md">
          CONTACT US
        </Button>
        <Button size="icon" variant="outline">
          <ShoppingBag />
        </Button>
        <ModeToggle />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">English</SelectItem>
            <SelectItem value="dark">Amharic</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage alt="profileImg" />
              <AvatarFallback>hehe</AvatarFallback>
            </Avatar></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>nsisay49@gmail.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Natnael Sisay</DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={handleLogout}>Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
};

export default Cheader;
