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
        <div className="overflow-auto mt-10 w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-white text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Value</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            
           
          </table>
        </div>
      </div>

    </div>
  )
}

export default Outofstock
