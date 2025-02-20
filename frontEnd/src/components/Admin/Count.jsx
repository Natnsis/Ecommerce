
const Count = () => {
  return (
    <div className="flex justify-between item-center">
      <div className="h-25 w-60  text-center rounded-2xl pt-3 px-5 bg-amber-100">
        Available Customer
        <p>0</p>
      </div>
      <div className="h-25 w-60  text-center rounded-2xl pt-3 px-5 bg-amber-200">
        Available Product
        <p>0</p>
      </div>
      <div className="h-25 w-60  text-center rounded-2xl pt-3 px-5 bg-amber-300">
        Number of Vendor
        <p>0</p>
      </div>
      <div className="h-25 w-60  text-center rounded-2xl pt-3 px-5 bg-amber-400"> 
        Number of Transaction
        <p>0</p>
      </div>
    </div>
  )
}

export default Count
