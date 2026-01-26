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

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: AuthTypes) => {
    console.log(data)
  }

  return (
    <section className="h-screen flex gap-20">
      <div className="flex h-full items-center w-1/2 justify-center">
        <Image src="/login.png" alt="login-image" width={300} height={400} />
      </div>
      <div className="flex items-center justify-center">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl text-center" >Welcome Back!</h1>
              <p className="mb-5 text-gray-600 dark:text-gray-400">
                Enter your email and password to access your account.
              </p>
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="mb-3" {...register("email")} />
              {errors.email && (<p className="text-red-600 mb-3">{errors.email.message}</p>)}
              <Label htmlFor="password">Password</Label>
              <Input id="password" className="mb-3" {...register("password")} />
              {errors.password && (<p className="text-red-600 mb-3">{errors.password.message}</p>)}
              <Button
                className="w-full mb-3"
                type="submit">
                Login
              </Button>
              <div className="flex items-center gap-2 mb-5">
                <Separator className="flex-1" />
                <span className="text-sm text-gray-500">or</span>
                <Separator className="flex-1" />
              </div>
              <Button variant="outline" className="w-full mb-5">
                <Image src="/google.png" alt="google" width={20} height={50} />
                <p>Sign in with Google</p>
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Don't have an account? register
                <Button
                  className="text-bold"
                  variant="link"
                  onClick={() => router.push("/auth/register")}>
                  Here
                </Button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Login 
