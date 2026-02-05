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
import { Spinner } from "@/components/ui/spinner"

const Register = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<AuthTypes>({
    resolver: zodResolver(AuthSchema),
    defaultValues: { email: "", password: "" }
  })

  const onSubmit = async (data: AuthTypes) => {
    try {
      setIsLoading(true)
      await RegisterWithEmail(data)
      toast.success("User registered successfully")
      router.push("/auth/login")
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message)
      else toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithOAuth = async () => {
    try {
      await GoogleOAuth()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
      else toast.error("Something went wrong")
    }
  }

  return (
    <section className="h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-4">
      <div className="flex items-center justify-center md:ml-10 ml-0">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl text-center mb-2">Get Started With Us</h1>
              <p className="mb-5 text-gray-600 dark:text-gray-400 text-center">
                Enter your email and password to create your account.
              </p>

              <Label htmlFor="email">Email</Label>
              <Input id="email" className="mb-3" {...register("email")} />
              {errors.email && <p className="text-red-600 mb-3">{errors.email.message}</p>}

              <Label htmlFor="password">Password</Label>
              <Input id="password" className="mb-3" {...register("password")} />
              {errors.password && <p className="text-red-600 mb-3">{errors.password.message}</p>}

              <Button type="submit" className="w-full mb-3" disabled={isLoading}>
                {isLoading ? <div className="flex gap-1"><Spinner /> Registering...</div> : "Register"}
              </Button>

              <div className="flex items-center gap-2 mb-5">
                <Separator className="flex-1" />
                <span className="text-sm text-gray-500">or</span>
                <Separator className="flex-1" />
              </div>
            </form>

            <Button
              variant="outline"
              className="w-full mb-5 flex items-center justify-center gap-2"
              onClick={loginWithOAuth}
            >
              <Image src="/google.png" alt="google" width={20} height={20} />
              Sign in with Google
            </Button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account?
              <Button
                variant="link"
                className="ml-1"
                onClick={() => router.push("/auth/login")}
              >
                Login Here
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex h-full w-1/2 items-center justify-center">
        <Image
          src="/register.png"
          alt="register-image"
          width={300}
          height={400}
          className="object-contain"
        />
      </div>
    </section>
  )
}

export default Register
