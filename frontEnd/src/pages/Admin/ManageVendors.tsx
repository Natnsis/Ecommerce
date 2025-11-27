import { ChartPie } from "@/components/diagrams/PieChart";
import Sidebar from "@/components/Sidebar";
import { VendorsTable } from "@/components/VendorTable";
import { ScanLine, ShoppingCart, SquarePlus, Users } from "lucide-react";

const ManageVendors = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="p-10 w-full h-screen overflow-auto">
        <h1 className="font-quater text-2xl mb-5">Vendors</h1>
        <div className="flex justify-between w-full gap-5">
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="border rounded-lg p-5">
              <h1 className=" font-primary flex gap-2 items-center text-sm"><Users size={20} /> Total Vendors</h1>
              <div className="flex justify-between mt-3">
                <p className="font-secondary-bold text-2xl "> 1243</p>
                <p className="text-sm font-primary flex items-end text-green-400">+6% this week</p>
              </div>
            </div>

            <div className="border rounded-lg p-5">
              <h1 className=" font-primary flex gap-2 items-center text-sm"><SquarePlus size={20} />New Vendors This Week</h1>
              <div className="flex justify-between mt-3">
                <p className="font-secondary-bold text-2xl ">320</p>
                <p className="text-sm font-primary flex items-end text-red-400">-3% this week</p>
              </div>
            </div>


            <div className="border rounded-lg p-5">
              <h1 className=" font-primary flex gap-2 items-center text-sm"><ShoppingCart size={20} /> Total Products</h1>
              <div className="flex justify-between mt-3">
                <p className="font-secondary-bold text-2xl "> 943</p>
                <p className="text-sm font-primary flex items-end text-red-400">-1 this week</p>
              </div>
            </div>


            <div className="border rounded-lg p-5">
              <h1 className=" font-primary flex gap-2 items-center text-sm"><ScanLine size={20} /> Sale Per Vendor</h1>
              <div className="flex justify-between mt-3">
                <p className="font-secondary-bold text-2xl "> 239</p>
                <p className="text-sm font-primary flex items-end text-green-400">+6% this week</p>
              </div>
            </div>

          </div>
          <div className="w-[50vw] h-[30vh]">
            <ChartPie />
          </div>
        </div>
        <div className="mt-5">
          <VendorsTable />
        </div>
      </div>
    </section >
  )
};

export default ManageVendors;
