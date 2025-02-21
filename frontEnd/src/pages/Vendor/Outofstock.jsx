import Vheader from "../../components/Vendor/Vheader"

const Outofstock = () => {
  return (
    <div className="p-5">
      <Vheader/>

      {/* out of stock list */}
      <div className="mt-10 bg-gray-200 pt-5 px-5 flex-col space-y-10 h-[80vh] rounded-lg">
        <div>
          <h1 className="text-center font-bold text-3xl ">Products Out of Stock</h1> 
        </div>
        <div>
          table
        </div>
      </div>

    </div>
  )
}

export default Outofstock
