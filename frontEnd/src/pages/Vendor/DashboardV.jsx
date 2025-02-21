import CountV from "../../components/Vendor/CountV"
import Vcards from "../../components/Vendor/Vcards"
import Vfooter from "../../components/Vendor/Vfooter"
import Vheader from "../../components/Vendor/Vheader"

const DashboardV = () => {
  return (
    <div className="px-5 pt-5">
      <Vheader/>
      <CountV/>

      {/* products table */}
      <div className="bg-gray-100 p-5 rounded-lg h-[80vh] ">
        <div>
          <h1 className="text-3xl font-extrabold text-center">List of Products on stock</h1>
        </div>
        <div className="overflow-scroll">
          Table
        </div>
      </div>

      <Vcards/>

      <Vfooter/>

    </div>
  )
}

export default DashboardV
