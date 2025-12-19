"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function CheaderClient({ profile }: { profile: any }) {
  const router = useRouter();

  const first = profile?.firstName ?? "";
  const last = profile?.lastName ?? "";
  const initials =
    (first?.[0] ?? "") + (last?.[0] ?? "") || (profile?.firstName?.[0] ?? "G");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={profile?.profileImage ?? "https://github.com/shadcn.png"}
            alt={profile?.firstName ?? "Guest"}
          />
          <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push("/CustomerDashboard")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form>
            <button className="w-full text-left">Logout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
