import Header from "../../components/Admin/Header"

const ChangePass = () => {
  return (
    <div className="px-10 pt-10 h-screen w-screen">
      <Header/>
      <div className="flex justify-center items-center ">
        <div className="  h-fit shadow-lg mt-20 px-5 py-10 space-y-3">
            <h1 className="font-extrabold text-3xl text-center">Change password</h1>
            <input type="text" className="px-5 border-b-1 py-2 " placeholder="Enter Current passoword" /><br />
            <p className="text-center text-red-500">error message</p>
            <input type="text" className="px-5 border-b-1 py-2 " placeholder="Enter new Password"  /><br />
            <p className="text-center text-red-500">error message</p>
            <input type="text" className="px-5 border-b-1 py-2 " placeholder="Confirm new passord"  /><br />
            <p className="text-center text-red-500">error message</p>
            <div className="flex justify-center">
                <button className="text-bold bg-amber-300 px-3 py-1 rounded hover:bg-white hover:border ">Change</button>
            </div>
         </div>

      </div>
      
    </div>
  )
}

export default ChangePass
