import Vheader from "./../../components/Vendor/Vheader"
import {useState} from 'react'
import {useNvigate} from 'react-router-dom'


const AddPro = () => {
  const [product, setProduct] = useState({
    name: '',
    stock: '',
    image: '',
    description: '',
    price: '',
    category: ''
  })

  const handleChange = (e)=>{
    
  }
  return (

    <div className="pt-5 px-5">
      <Vheader/>

      {/* form */}
      <div className="flex justify-center items-center  mt-10 ">
        <div className="border border-gray-200 p-5 w-[60%] h-fit">
          <center className="space-y-2 text-gray-400">
            <h1 className="text-3xl font-bold text-black">Add Products</h1>
            <label htmlFor="">Product name: </label>
            <input type="text" className="border border-gray-200 px-2 py-1 text-center text-black" placeholder="" id="" /><br />
            <label htmlFor="">Product Available Stock: </label>
            <input type="number" className="border border-gray-200 px-2 py-1 text-center text-black w-20" placeholder="" id="" /><br />
            <label htmlFor="">Choose a product Image</label><br />
            <input type="file" className="border border-gray-200 px-2 py-1 text-center  hover:bg-gray-700 hover-text-white"  /><br />
            <label htmlFor="">Product Description</label><br />
            <textarea className="border border-gray-200 px-2 py-1 w-full h-30 text-black" id=""></textarea><br />
            <label htmlFor="">Price of Product(In Birr): </label>
            <input type="number" className="border border-gray-200 px-2 py-1 text-center text-black" name="" id="" /><br />
            <label htmlFor="">Category: </label>
            <select className="border border-gray-200 px-2 py-1 text-center text-black" >
              <option value=""> </option>
              <option value="">Cloths</option>
              <option value="">Lexury</option>
              <option value="">Accessories</option>
              <option value="">Electornics</option>
              <option value="">Tools</option>
              <option value="">Food</option>
              <option value="">Detergents</option>
            </select><br />

            <button className="hover:border-black hover:border hover:bg-white hover:text-black 
            px-3 py-1 rounded-sm bg-black text-white">
              Add
            </button>
            
          </center>
        </div> 
      </div>
    </div>
  )
}

export default AddPro
