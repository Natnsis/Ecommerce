import {Link} from "react-router-dom"

const Register = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-300 to-gray-100">
      <div className="w-85 bg-white h-fit rounded-2xl px-5 py-5">
        <div className="my-5">
            <h1 className="font-extrabold text-3xl text-center">Registeration</h1>
        </div>
        <div className="space-y-2">
            <input type="text" className="w-70 border px-5 py-1 rounded text-center" placeholder="Enter username" />
            <p className="text-red-500 text-center">this is an error text</p>
            <input type="password" className="w-70 border px-5 py-1 rounded text-center" placeholder="Enter Password" />
            <p className="text-red-500 text-center"> this is an error text</p>
            <input type="text" className="w-70 border px-5 py-1 rounded text-center" placeholder="Enter Full Name" />
            <p className="text-red-500 text-center">this is an error text</p>
            <label className="text-center w-full">select your profile image</label>
            <input type="file" className="cursor-pointer border px-3 rounded-lg hover:bg-blue-300" id="" />
            <input type="email" className="w-70 border px-5 py-1 rounded text-center" placeholder="Enter Email" />
            <p className="text-red-500 text-center">this is an error text</p>
        </div>
        <div className="w-full flex justify-center my-3">
            <button className="bg-blue-300 rounded px-3 py-1 hover:bg-white hover:border">Register</button>
        </div>
        <div>
            <p className="text-center">You alredy have an account? <Link to="/login">
            <span className="text-blue-300 hover:text-red-300">Login Here</span></Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
