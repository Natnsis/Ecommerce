import { loginWithGoogle, loginWithPassword } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getUserData } from "@/lib/getCurrentUser"
import { ShoppingBasket } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

const Login = async () => {
  const { role } = await getUserData()
  if (role === 'CUSTOMER') {
    redirect('/CustomerDashboard')
  } else if (role === 'VENDOR') {
    redirect('/vendor/dashboard')
  } else if (role === 'ADMIN') {
    redirect('/admin/dashboard')
  }
  console.log(role)
  return (
    <section className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <h1 className="text-center text-4xl font-secondary-extrabold flex gap-2 items-center justify-center mb-5">
            <ShoppingBasket size={40} /> Gebeya
          </h1>
          <p className="w-80 text-center text-sm font-primary mb-5">
            Welcome back!, Simplify your shoping, and find whatever you want on this platform.
          </p>
          <form className="flex flex-col gap-4" action={loginWithPassword}>
            <Input placeholder="Email" className="rounded-full" name="email" />
            <Input placeholder="Password" className="rounded-full" name="password" />
            <Button className="rounded-full w-full">Sign In</Button>
          </form>
          <div className="flex items-center gap-2 mt-2">
            <Separator className="flex-1" />
            <p className="whitespace-nowrap font-primary">or continue with</p>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <form action={loginWithGoogle} className="w-full">
              <Button className="w-full" variant="outline">
                <FcGoogle size={20} /> Google
              </Button>
            </form>
          </div>
          <p className="font-priamry text-sm text-center mt-4">Already a memeber? <Link href="/register" className="text-green-600">Register now</Link></p>
        </div>
      </div>

      <div className="w-[45vw]">
        <img
          src="/login.jpg"
          className="h-screen w-full object-cover"
        />
      </div>
    </section>
  )
}

export default Login
