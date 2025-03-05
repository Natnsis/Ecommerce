import Vheader from "./../../components/Vendor/Vheader";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPro = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:4000/userInfo', { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserInfo();
  }, [navigate]);
  
  
  const [product, setProduct] = useState({
    name: '',
    stock: '',
    image: null,
    description: '',
    price: '',
    category: ''
  });


      

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:4000/userInfo', { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setProduct((prevData) => ({
            ...prevData
          }));
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAdding = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/addProducts', product);
      if (response.data.Error) {
        alert("An error occurred couldn't add.");
      } else {
        alert("Product added successfully");
        navigate("/Vdash");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred couldn't add.");
    }
  };

  return (
    <div className="pt-5 px-5">
      <Vheader />

      {/* form */}
      <div className="flex justify-center items-center mt-10">
        <div className="border border-gray-200 p-5 w-[60%] h-fit">
          <center className="space-y-2 text-gray-400">
            <h1 className="text-3xl font-bold text-black">Add Products</h1>
            <form onSubmit={handleAdding}>
              <label htmlFor="name">Product name:  </label>
              <input
                type="text"
                name="name"
                className="border border-gray-200 px-2 py-1 text-center text-black"
                placeholder=""
                value={product.name}
                onChange={handleChange}
                id="name"
              /><br />
              <label htmlFor="stock">Product Available Stock: </label>
              <input
                type="number"
                name="stock"
                className="border border-gray-200 px-2 py-1 text-center text-black w-20"
                placeholder=""
                value={product.stock}
                onChange={handleChange}
                id="stock"
              /><br />
              <label htmlFor="image">Choose a product Image</label><br />
              <input
                type="file"
                name="image"
                className="border border-gray-200 px-2 py-1 text-center hover:bg-gray-700 hover-text-white"
                onChange={handleChange}
                id="image"
              /><br />
              <label htmlFor="description">Product Description</label><br />
              <textarea
                name="description"
                className="border border-gray-200 px-2 py-1 w-full h-30 text-black"
                value={product.description}
                onChange={handleChange}
                id="description"
              ></textarea><br />
              <label htmlFor="price">Price of Product (In Birr): </label>
              <input
                type="number"
                name="price"
                className="border border-gray-200 px-2 py-1 text-center text-black"
                value={product.price}
                onChange={handleChange}
                id="price"
              /><br />
              <label htmlFor="category">Category: </label>
              <select
                name="category"
                className="border border-gray-200 px-2 py-1 text-center text-black"
                value={product.category}
                onChange={handleChange}
                id="category"
              >
                <option value=""> </option>
                <option value="Cloths">Cloths</option>
                <option value="Luxury">Luxury</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Tools">Tools</option>
                <option value="Food">Food</option>
                <option value="Detergents">Detergents</option>
              </select><br />

              <button
                type="submit"
                className="hover:border-black hover:border hover:bg-white hover:text-black px-3 py-1 rounded-sm bg-black text-white"
              >
                Add
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};

export default AddPro;