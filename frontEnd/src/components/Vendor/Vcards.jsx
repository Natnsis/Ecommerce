import logo from "./../../images/logo.jpg"

const Vcards = () => {
  return (
    <div className="bg-gray-50 mt-5 p-10 rounded-2xl flex-col justify-between ">
        <div className="mb-15">
            <h1 className="text-center font-bold text-3xl ">Active Customers</h1>
        </div>

        {/* cards container */}
        <div className="flex justify-between items-center">
        {/* card one */}
        <div className="bg-gray-700 w-[25%] h-[60vh] rounded-md  pb-3 px-10 flex-col justify-between hover:bg-gray-950 space-y-5">
            <div className=" flex justify-center mt-[-30px]">
                <img src={logo}
                className="rounded-full w-30  border-1 border-white"  />
        </div>
        <div>
            <h1 className="text-center text-white font-bold text-2xl">Natnael Sisay</h1>
        </div>
        <div className="border-white border px-3 py-1">
            <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam nisi placeat numquam </p>
        </div>
        <div>
            <h1 className="text-gray-50">Contact</h1>
            <p className="text-gray-400">Email: example@gmail.com</p>
        </div>
      </div>

      {/* card two */}
      <div className="bg-gray-700 w-[25%] h-[60vh] rounded-md  pb-3 px-10 flex-col justify-between hover:bg-gray-950 space-y-5">
        <div className=" flex justify-center mt-[-30px]">
            <img src={logo}
            className="rounded-full w-30  border-1 border-white"  />
        </div>
        <div>
            <h1 className="text-center text-white font-bold text-2xl">Natnael Sisay</h1>
        </div>
        <div className="border-white border px-3 py-1">
            <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam nisi placeat numquam </p>
        </div>
        <div>
            <h1 className="text-gray-50">Contact</h1>
            <p className="text-gray-400">Email: example@gmail.com</p>
        </div>
      </div>

      {/* card three */}
      <div className="bg-gray-700 w-[25%] h-[60vh] rounded-md  pb-3 px-10 flex-col justify-between hover:bg-gray-950 space-y-5">
        <div className=" flex justify-center mt-[-30px]">
            <img src={logo}
            className="rounded-full w-30  border-1 border-white"  />
        </div>
        <div>
            <h1 className="text-center text-white font-bold text-2xl">Natnael Sisay</h1>
        </div>
        <div className="border-white border px-3 py-1">
            <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam nisi placeat numquam </p>
        </div>
        <div>
            <h1 className="text-gray-50">Contact</h1>
            <p className="text-gray-400">Email: example@gmail.com</p>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Vcards
