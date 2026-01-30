"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  HouseSimpleIcon,
  StorefrontIcon,
  UsersThreeIcon,
  TreasureChestIcon,
  SignOutIcon
} from "@phosphor-icons/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AdminModeToggle } from "@/components/admin-mode"
import { Logout } from "@/app/conrollers/auth.controller"
import { toast } from "sonner"
import { ModeToggle } from "./mode-toggle"

type PageVariants = "ghost" | "default"

const Sidebar = ({ pageName }: { pageName: string }) => {
  const router = useRouter()
  const [home, setHome] = useState<PageVariants>("default");
  const [order, setOrder] = useState<PageVariants>("ghost")
  const [user, setUser] = useState<PageVariants>("ghost")
  const [product, setProduct] = useState<PageVariants>("ghost")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    switch (pageName) {
      case "home":
        setHome("default")
        setOrder("ghost")
        setUser("ghost")
        setProduct("ghost")
        break;

      case "order-list":
        setHome("ghost")
        setOrder("default")
        setUser("ghost")
        setProduct("ghost")
        break;

      case "users":
        setHome("ghost")
        setOrder("ghost")
        setUser("default")
        setProduct("ghost")
        break;

      case "products":
        setHome("ghost")
        setOrder("ghost")
        setUser("ghost")
        setProduct("default")
        break;

      default:
        break;
    }
  }, [])

  const logout = async () => {
    try {
      setIsLoading(true)
      await Logout()
      setIsLoading(false)
      toast.success("you've logged out");
      router.push("/auth/login");
    } catch (error) {
      throw error
    }
  }

  return (
    <aside className="col-span-1 border-r p-2 h-full">
      <div className="h-full">
        <div>
          <Image alt="logo-img" src="/gebeya-logo.png" width={60} height={200} />
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            onClick={() => router.push("/admin")}
            variant={home}>
            <HouseSimpleIcon />
            <div className="hidden md:block">
              Home
            </div>
          </Button>
          <Button
            className="w-full mt-5 flex justify-start md:gap-2"
            variant={order}
            onClick={() => router.push("/admin/order-list")}>
            <StorefrontIcon />
            <div className="hidden md:block">
              Order List
            </div>
          </Button>
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant={user}
            onClick={() => router.push("/admin/users")}>
            <UsersThreeIcon />
            <div className="hidden md:block">
              Users
            </div>
          </Button>
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant={product}
            onClick={() => router.push("/admin/products")}>
            <TreasureChestIcon />
            <div className="hidden md:block">
              Products
            </div>
          </Button>
          <div className="mt-5">
            <div className="hidden md:block">
              <AdminModeToggle />
            </div>
            <div className="flex md:hidden justify-start">
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="h-[50vh] md:flex md:items-end">
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant="ghost"
            disabled={isLoading}
            onClick={logout}>
            <SignOutIcon />
            <div className="hidden md:block">
              {isLoading ?
                <div>
                  logging out...
                </div> :
                "Logout"}
            </div>
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
