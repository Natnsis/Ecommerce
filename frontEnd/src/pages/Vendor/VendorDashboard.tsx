import { BestSelling } from "@/components/BestSelling"
import { BarGraph } from "@/components/diagrams/BarChat"
import VCards from "@/components/VCards"
import Vheader from "@/components/Vheader"
import VNotifications from "@/components/VNotifications"

const VendorDashboard = () => {
  return (
    <section>
      <Vheader />
      <div className="flex gap-40">
        <div className="px-10 mt-5 w-full">
          <div className="flex justify-between pr-20">
            <div>
              <h1 className="font-quater text-3xl">Dashboard</h1>
              <p className="font-primary text-gray-500 mt-1">Manage your products and sales</p>
            </div>
            <div className="flex justify-center items-end">
              <p className="text-xl">Good Morning! Natnael</p>
            </div>
          </div>
          <VCards />
          <div className="mt-5 flex gap-5">
            <div className="w-2/3">
              <BarGraph />
            </div>
            <div className="w-1/3 ">
              <VNotifications />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <BestSelling />
      </div>

    </section>
  )
}

export default VendorDashboard
