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
            Home
          </Button>
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant={order}
            onClick={() => router.push("/admin/order-list")}>
            <StorefrontIcon />
            Order List
          </Button>
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant={user}
            onClick={() => router.push("/admin/users")}>
            <UsersThreeIcon />
            Users
          </Button>
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant={product}
            onClick={() => router.push("/admin/products")}>
            <TreasureChestIcon />
            Products
          </Button>
          <div className="mt-5">
            <AdminModeToggle />
          </div>
        </div>

        <div className="h-[50vh] flex items-end">
          <Button
            className="w-full mt-5 flex justify-start gap-2"
            variant="ghost"
            disabled={isLoading}
            onClick={logout}>
            <SignOutIcon />
            {isLoading ?
              <div>
                logging out...
              </div> :
              "Logout"}
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
