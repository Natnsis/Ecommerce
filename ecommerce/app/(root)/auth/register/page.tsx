"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

const Register = () => {
  const router = useRouter()
  return (
    <section className="h-screen flex gap-10">
      <div className="flex items-center justify-center w-1/2">
        <Card>
          <CardContent>
            <h1 className="text-3xl text-center" >Get Started With Us</h1>
            <p className="mb-5 text-gray-600">Enter your email and password to create your account.</p>
            <Label htmlFor="email">Email</Label>
            <Input id="email" className="mb-3" />
            <Label htmlFor="password">Password</Label>
            <Input id="password" className="mb-3" />
            <Button className="w-full mb-3">Register</Button>
            <div className="flex items-center gap-2 mb-5">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">or</span>
              <Separator className="flex-1" />
            </div>
            <Button variant="outline" className="w-full mb-5">
              <Image src="/google.png" alt="google" width={20} height={50} />
              <p>Sign in with Google</p>
            </Button>
            <p className="text-center text-gray-600">Already have an account? register
              <Button className="text-bold" variant="link" onClick={() => router.push("/auth/login")}>
                Here
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex h-full items-center justify-center">
        <Image src="/register.png" alt="login-image" width={300} height={400} />
      </div>
    </section>
  )
}

export default Register 
