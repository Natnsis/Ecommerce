"use client"
import { MyProductsTable } from "@/components/MyProductsTable"
import { Button } from "@/components/ui/button"
import Vheader from "@/components/Vheader"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

const VendorProducts = () => {
  const router = useRouter()
  return (
    <section>
      <Vheader />
      <div className="p-5">
        <div className="flex justify-between mr-20">
          <h1 className="font-quater text-xl">My Products</h1>
          <Button className="flex" variant="outline" onClick={()=> router.push("/AddProducts")}><Plus /> Add</Button>
        </div>
        <div className="px-15">
          <MyProductsTable />
        </div>
      </div>
    </section>
  )
}

export default VendorProducts
