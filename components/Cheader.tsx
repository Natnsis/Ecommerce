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
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
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
import { redirect } from "next/navigation";

const Cheader = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getClaims();
      setUser(data?.claims ?? null);
    };

    loadUser();
  }, []);

  console.log(user);
  if (!user) {
    redirect('/login')
  }
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
              <AvatarImage src={user.user_metadata?.picture} alt="profileImg" />
              <AvatarFallback>{user.user_metadata?.full_name}</AvatarFallback>
            </Avatar></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.user_metadata?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{user.user_metadata?.full_name}</DropdownMenuItem>
            <DropdownMenuItem>
              <Button></Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
};

export default Cheader;
