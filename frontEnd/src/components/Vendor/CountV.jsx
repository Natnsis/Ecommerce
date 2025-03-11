
const CountV = () => {
  return (
    <div className="mt-10 flex justify-between items-center">
      <div className=" bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5
      rounded-2xl w-[25%]">
        <div>
          <h1 className="text-center">Number of products</h1>   
        </div>
        <div className="w-full">
            <p className="text-center">0</p>
        </div>
      </div>

      <div className=" bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5
      rounded-2xl w-[25%] my-5">
        <div>
          <h1 className="text-center">sold products</h1>   
        </div>
        <div className="w-full">
            <p className="text-center">0</p>
        </div>
      </div>

      <div className=" bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5
      rounded-2xl w-[25%]">
        <div>
          <h1 className="text-center">Profit</h1>   
        </div>
        <div className="w-full">
            <p className="text-center">0</p>
        </div>
      </div>
    </div>
  )
}

export default CountV
