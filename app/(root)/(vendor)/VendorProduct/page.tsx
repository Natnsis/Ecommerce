import { MyProductsTable } from "@/components/MyProductsTable"
import Vheader from "@/components/Vheader"

const VendorProducts = () => {
  return (
    <section>
      <Vheader />
      <div className="p-5">
        <h1 className="font-quater text-xl">My Products</h1>
        <div className="px-15">
          <MyProductsTable />
        </div>
      </div>
    </section>
  )
}

export default VendorProducts
