
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { LayoutDashboard, LogOut, MessageCircle, ScanLine, UserPen } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Vheader = () => {
  const navigate = useNavigate();
  return (
    <header className="w-screen flex justify-center">
      <nav className="p-1 flex gap-5 border rounded-b-lg pr-5">
        <Button variant="ghost" onClick={() => navigate("/vdash")}><LayoutDashboard />DASHBOARD</Button>
        <Button variant="ghost" onClick={() => navigate("/vproduct")}><ScanLine />PRODUCT</Button>
        <Button variant="ghost" onClick={() => navigate("/vchat")}><MessageCircle />CHAT</Button>
        <Button variant="ghost" onClick={() => navigate("/vprofile")}><UserPen />PROFILE</Button>
        <Button variant="ghost" onClick={() => navigate("/login")}><LogOut />LOGOUT</Button>
        <ModeToggle />
      </nav>
    </header>
  )
}

export default Vheader
