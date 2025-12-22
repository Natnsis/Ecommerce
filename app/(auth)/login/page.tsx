"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from 'react'
import { loginWithGoogle, loginWithPassword } from "@/action/auth";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/CustomerDashboard");
      }
    };

    checkUser();
  }, [router]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await loginWithPassword(email, password)
      const user = await supabase.auth.getUser();
      if (!user) {
        alert('not logged in bro')
        router.push("/");
      }
      router.push("/CustomerDashboard");
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <h1 className="text-center text-4xl font-secondary-extrabold flex gap-2 items-center justify-center mb-5">
            <ShoppingBasket size={40} /> Gebeya
          </h1>
          <p className="w-80 text-center text-sm font-primary mb-5">
            Welcome back!, Simplify your shoping, and find whatever you want on
            this platform.
          </p>
          <div className="flex flex-col gap-4">
            <Input placeholder="Email" className="rounded-full" onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password"
              className="rounded-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="rounded-full w-full" onClick={handleSubmit}>Sign In</Button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Separator className="flex-1" />
            <p className="whitespace-nowrap font-primary">or continue with</p>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <Button className="w-full" variant="outline" onClick={async (e) => {
              e.preventDefault();
              try {
                await loginWithGoogle();
              } catch (err) {
                console.log(err);
              }
            }}>
              <FcGoogle size={20} /> Google
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            Google sign-in is used for Customer accounts
          </p>
          <p className="font-priamry text-sm text-center mt-4">
            Already a memeber?{" "}
            <Link href="/register" className="text-green-600">
              Register now
            </Link>
          </p>
        </div>
      </div>

      <div className="w-[45vw]">
        <img src="/login.jpg" className="h-screen w-full object-cover" />
      </div>
    </section >
  );
};

export default Login;
