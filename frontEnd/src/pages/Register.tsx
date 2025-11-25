import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingBasket } from "lucide-react"
import { AiFillApple } from "react-icons/ai"
import { FaFacebookF } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <section className="flex h-screen">
      <div className="w-[45vw]">
        <img
          src="/register.jpg"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div>
          <h1 className="text-center text-4xl font-secondary-extrabold flex gap-2 items-center justify-center mb-5">
            <ShoppingBasket size={40} /> Gebeya
          </h1>
          <p className="w-80 text-center text-sm font-primary mb-5">
            Welcome to Gebeya, where you can find whatever you desire, connect with countless vendors
          </p>
          <form className="flex flex-col gap-4">
            <Input placeholder="Username" className="rounded-full" />
            <Input placeholder="Password" className="rounded-full" />
            <Button className="rounded-full w-full">Sign Up</Button>
          </form>
          <div className="flex items-center gap-2 mt-2">
            <Separator className="flex-1" />
            <p className="whitespace-nowrap font-primary">or continue with</p>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <Button variant="outline">
              <FcGoogle size={20} />
            </Button>
            <Button variant="outline">
              <FaFacebookF size={20} />
            </Button>
            <Button variant="outline">
              <AiFillApple size={20} />
            </Button>
          </div>
          <p className="font-priamry text-sm text-center mt-4">not a memeber? <Link to="/login" className="text-green-600">Login now</Link></p>
        </div>
      </div>

    </section>
  )
}

export default Register
