"use client";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  ScanLine,
  UserPen,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";

const Vheader = () => {
  const router = useRouter();
  return (
    <header className="w-screen flex justify-center">
      <nav className="p-1 flex gap-5 border rounded-b-lg pr-5">
        <Button variant="ghost" onClick={() => router.push("/VendorDashboard")}>
          <LayoutDashboard />
          DASHBOARD
        </Button>
        <Button variant="ghost" onClick={() => router.push("/VendorProduct")}>
          <ScanLine />
          PRODUCT
        </Button>
        <Button variant="ghost" onClick={() => router.push("/VendorChat")}>
          <MessageCircle />
          CHAT
        </Button>
        <Button variant="ghost" onClick={() => router.push("/VendorProfile")}>
          <UserPen />
          PROFILE
        </Button>
        <form>
          <Button variant="ghost" type="submit">
            <LogOut />
            LOGOUT
          </Button>
        </form>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Vheader;
