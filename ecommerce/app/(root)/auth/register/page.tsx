"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthSchema, AuthTypes } from "@/app/schemas/auth.schema"
import { useState } from "react"
import { GoogleOAuth, RegisterWithEmail } from "@/app/conrollers/auth.controller"
import { toast } from "sonner"

const Register = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: AuthTypes) => {
    try {
      setIsLoading(true)
      await RegisterWithEmail(data);
      toast.success("user registered succcessfully")
      setIsLoading(false)
      router.push("/auth/login")
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const loginWithOAuth = async () => {
    try {
      await GoogleOAuth()
    } catch (error) {
      throw error
    }
  }

  return (
    <section className="h-screen flex gap-10">
      <div className="flex items-center justify-center w-1/2">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl text-center" >Get Started With Us</h1>
              <p className="mb-5 text-gray-600 dark:text-gray-400">Enter your email and password to create your account.</p>
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="mb-3" {...register("email")} />
              {errors.email && (<p className="text-red-600 mb-3">{errors.email.message}</p>)}
              <Label htmlFor="password">Password</Label>
              <Input id="password" className="mb-3" {...register("password")} />
              {errors.password && (<p className="text-red-600 mb-3">{errors.password.message}</p>)}
              <Button
                className="w-full mb-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "registering..." : "Register"}
              </Button>
              <div className="flex items-center gap-2 mb-5">
                <Separator className="flex-1" />
                <span className="text-sm text-gray-500">or</span>
                <Separator className="flex-1" />
              </div>
              <Button
                variant="outline"
                className="w-full mb-5"
                onClick={loginWithOAuth}>
                <Image
                  src="/google.png"
                  alt="google"
                  width={20}
                  height={50} />
                <p>Sign in with Google</p>
              </Button>
              <p
                className="text-center text-gray-600 dark:text-gray-400">
                Already have an account? register
                <Button
                  className="text-bold"
                  variant="link"
                  onClick={() => router.push("/auth/login")}>
                  Here
                </Button>
              </p>
            </form>
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
