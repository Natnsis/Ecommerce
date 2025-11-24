import { Smartphone } from "lucide-react"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <div className="flex px-5 py-1 justify-between items-center border-b">
      <Button className="flex gap-2 items-center" variant="ghost">
        <Smartphone size={20} />
        <p className="text-sm">Download Gebeya App</p>
      </Button>

      <div className="flex items-center">
        <Button variant="ghost">
          About Gebeya
        </Button>
        <Button variant="ghost">
          Give a Star
        </Button>
        <Button variant="ghost">
          Contact
        </Button>
        <Button variant="ghost">
          Sign Up
        </Button>
        <Button >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Header
