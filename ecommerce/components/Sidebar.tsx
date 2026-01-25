import { Button } from "@/components/ui/button"
import { HouseSimpleIcon, StorefrontIcon, UsersThreeIcon, GearSixIcon } from "@phosphor-icons/react"
import Image from "next/image"

const Sidebar = () => {
  return (
    <aside className="col-span-1 border-r p-2 h-full">
      <div className="h-full">
        <div>
          <Image alt="logo-img" src="/gebeya-logo.png" width={60} height={200} />
          <Button className="w-full mt-5 flex justify-start gap-2">
            <HouseSimpleIcon />
            Home
          </Button>
          <Button className="w-full mt-5 flex justify-start gap-2" variant="ghost">
            <StorefrontIcon />
            Order List
          </Button>
          <Button className="w-full mt-5 flex justify-start gap-2" variant="ghost">
            <UsersThreeIcon />
            Users
          </Button>
        </div>
        <div className="h-2/3 flex items-end">
          <Button className="w-full mt-5 flex justify-start gap-2" variant="ghost">
            <GearSixIcon />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
