import { BarGraph } from "@/components/diagrams/BarChat"
import VCards from "@/components/VCards"
import Vheader from "@/components/Vheader"

const VendorDashboard = () => {
  return (
    <section>
      <Vheader />
      <div className="flex gap-40">
        <div className="px-10 mt-5 w-full">
          <h1 className="font-quater text-3xl">Dashboard</h1>
          <p className="font-primary text-gray-500 mt-1">Manage your products and sales</p>
          <VCards />
          <BarGraph />
        </div>
      </div>

    </section>
  )
}

export default VendorDashboard
