"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingBasket } from "lucide-react"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerWithPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;
      if (!data.user) {
        throw new Error("User creation succeeded but no user data returned");
      }
      const { error: profilesError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: data.user.id,
            role: "CUSTOMER",
          },
          { onConflict: "id" }
        );
      if (profilesError) throw profilesError;
      toast("User registered successfully");
      console.log("Registered user:", data.user);
    } catch (err: any) {
      console.error("Registration error:", err);
      toast(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/CustomerDashboard`,
      },
    });
    if (error) {
      console.error("Google login error:", error);
      toast("Failed to sign in with Google.");
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={registerWithPassword}>
            <Input
              placeholder="Email"
              className="rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email" />
            <Input
              placeholder="Password"
              className="rounded-full"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="rounded-full w-full"
              type="submit">
              {!isLoading ? "Sign Up" : "signing up..."}
            </Button>
          </form>
          <div className="flex items-center gap-2 mt-2">
            <Separator className="flex-1" />
            <p className="whitespace-nowrap font-primary">or continue with</p>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <form className="w-full">
              <Button className="w-full" variant="outline" onClick={loginWithGoogle}>
                <FcGoogle size={20} /> Google
              </Button>
            </form>
          </div>
          <p className="font-priamry text-sm text-center mt-4">not a memeber? <Link href="/login" className="text-green-600">Login now</Link></p>
        </div>
      </div>

    </section >
  )
}
import { toast } from "sonner"

export default Register
