"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginWithPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error("Login succeeded but no user returned");
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single();
      if (profileError) throw profileError;
      if (!profileData) throw new Error("Profile not found");
      const role = profileData.role?.toUpperCase();

      switch (role) {
        case "ADMIN":
          router.push("/AdminDashboard");
          break;
        case "VENDOR":
          router.push("/VendorDashboard");
          break;
        case "CUSTOMER":
          router.push("/CustomerDashboard");
          break;
        default:
          router.push("/login");
      }
      alert("User logged in successfully");
      console.log("Logged in user:", authData.user, "Role:", role);
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Please check your credentials.");
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
      alert("Failed to sign in with Google.");
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={loginWithPassword}>
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
              {!isLoading ? "Sign In" : "signing up..."}
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
    </section>
  );
};

export default Login;
