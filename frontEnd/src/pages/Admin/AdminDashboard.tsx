import { ChartLineDots } from "@/components/diagrams/chartLine";
import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/Sidebar"
import { Separator } from "@/components/ui/separator";
import { SeparatorVertical } from "lucide-react";
import { useState } from "react"

const AdminDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <section className="flex">
      <Sidebar />
      <div className="p-10 w-full bg-black flex gap-20">
        <div className="bg-white w-1/2 h-screen flex flex-col">
          <div className="flex items-end justify-between pr-20">
            <h1 className="font-quater text-4xl">Dashboard</h1>
            <ModeToggle />
          </div>

          <div className="flex justify-center">
            <div className="px-10 mt-10 flex-col flex gap-2 w-fit">
              <p className="font-primary">Products</p>
              <Separator />
              <h1 className="font-quater text-center">324</h1>
            </div>

            <div className="px-10 mt-10 flex-col flex gap-2 w-fit">
              <p className="font-primary">Transactions</p>
              <Separator />
              <h1 className="font-quater text-center">1239</h1>
            </div>

            <div className="px-10 mt-10 flex-col flex gap-2 w-fit">
              <p className="font-primary">Feedbacks</p>
              <Separator />
              <h1 className="font-quater text-center">234</h1>
            </div>
          </div>

          <div className="mt-5">
            <ChartLineDots />
          </div>
        </div>
        <div className="bg-white w-1/2 h-screen"></div>
      </div>
    </section>
  )
}

export default AdminDashboard


/*
<div className="p-10 flex w-full">
 <div className="">
  <div className="flex justify-between w-1/2">
     </div>
       </div>
        <div className="w-full flex justify-between">
          <div>
            Products
            <SeparatorVertical />
          </div>
          <div>Transactions</div>
          <div>Feedbacks</div>
        </div>
      </div>
      <div>
        hehe
      </div>
 */
