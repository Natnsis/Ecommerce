import {Link} from "react-router-dom"

const Register = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-600 to-gray-400">
      <div className="w-80 bg-white h-92 rounded-2xl px-5 py-5">
        <div className="my-5">
            <h1 className="font-extrabold text-3xl text-center">Login</h1>
        </div>
        <div>
            <input type="text" className="w-70 border px-5 py-1 rounded text-center" placeholder="Enter username" />
            <p className="text-red-500 text-center">error text</p>
            <input type="password" className="w-70 border px-5 py-1 rounded text-center" placeholder="Enter Password" />
            <p className="text-red-500 text-center">error text</p>
        </div>
        <div className="w-full flex justify-center my-3">
            <button className="bg-blue-300 rounded px-3 py-1">submit</button>
        </div>
        <div>
            <p className="text-center">You dont have an account? <Link to="/register"><span className="text-blue-300 hover:text-red-300">Register Here</span></Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
