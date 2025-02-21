import Vheader from "../../components/Vendor/Vheader"

const ChangePassV = () => {
  return (
    <div className="pt-5 px-5">
      <Vheader/>
      {/* change password form */}
      <div className="flex justify-center items-center h-[80vh] mt-10">
        <div className="rounded-lg shadow-2xl w-[60%] h-fit p-5">
          <center className="space-y-3">
            <h1 className="text-3xl font-bold">Change Password</h1>
            <label htmlFor="">Enter Current Password: </label>
            <input type="text" className="border border-gray-200 rounded-sm px-2 py-1"  /><br />
            <p className="text-red-500">Error message</p>
            <label htmlFor="">Enter New Password: </label>
            <input type="text" className="border border-gray-200 rounded-sm px-2 py-1"  /><br />
            <p className="text-red-500">Error message</p>
            <label htmlFor="">Confirm New Password: </label>
            <input type="text" className="border border-gray-200 rounded-sm px-2 py-1"  /><br />
            <p className="text-red-500">Error message</p>
            <button className="bg-black text-white px-3 py-1 rounded-sm hover:text-black hover:bg-white 
            hover:border hover:border-gray-300">Change</button>
            
          </center>
        </div>
      </div>
    </div>
  )
}

export default ChangePassV
