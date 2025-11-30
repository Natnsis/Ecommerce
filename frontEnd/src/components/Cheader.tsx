import { ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const Cheader = () => {
  const navigate = useNavigate()
  return (
    <div className="px-5 py-3 flex justify-between">
      <h1 className="font-quater text-2xl">Gebeya</h1>
      <div className="flex items-center gap-5">
        <Button variant="ghost" className="font-secondary-extrabold text-md" onClick={() => navigate('/cdash')}>HOME</Button>
        <Button variant="ghost" className="font-secondary-extrabold text-md">CONTACT US</Button>
        <Button size="icon" variant="outline"><ShoppingBag /></Button>
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Cheader
