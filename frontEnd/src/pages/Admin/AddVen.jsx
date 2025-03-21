import { useState } from "react";
import Header from "../../components/Admin/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddVen = () => {
  const [vendor, setVendor] = useState({
    username: "",
    password: "",
    fullName: "",
    image: null,
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    fullName: "",
    image: "",
    form: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVendor((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAdding = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = {
      username: "",
      password: "",
      fullName: "",
      image: "",
      form: "",
    };

    if (!vendor.username) {
      newError.username = "Enter the username";
      hasError = true;
    }
    if (!vendor.password) {
      newError.password = "Enter the password";
      hasError = true;
    }
    if (!vendor.fullName) {
      newError.fullName = "Enter the full name";
      hasError = true;
    }
    if (!vendor.image) {
      newError.image = "Select an image";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    const data = new FormData();
    data.append("username", vendor.username);
    data.append("password", vendor.password);
    data.append("fullName", vendor.fullName);
    data.append("image", vendor.image);

    try {
      const response = await axios.post("http://localhost:4000/addVendor", data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        alert("Vendor added successfully");
        navigate("/manageVen");
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred couldn't add.",
      }));
    }
  };

  return (
    <div className="px-5 pt-5">
      <Header />
      <div className="flex flex-col md:flex-row justify-between items-center px-5 pt-5">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Add New Vendors</h1>
        </div>
        <div>
          <button className="bg-amber-300 px-4 py-2 hover:border hover:bg-white hover:text-amber-400 rounded-lg transition duration-300">
            <Link to="/manageVen">Go Back</Link>
          </button>
        </div>
      </div>
      <div className="flex mt-10 justify-center items-center">
        <div className="px-10 py-8 shadow-2xl rounded-lg space-y-4 bg-white w-full max-w-lg">
          <form onSubmit={handleAdding}>
            <input
              className="border border-gray-300 px-5 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={vendor.fullName}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.fullName}</p>

            <input
              className="border border-gray-300 px-5 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="text"
              placeholder="Enter Username"
              name="username"
              value={vendor.username}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.username}</p>

            <input
              className="border border-gray-300 px-5 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={vendor.password}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.password}</p>

            <p className="text-center font-semibold text-gray-700">Upload Vendor Image</p>
            <input
              className="hover:bg-black hover:text-white px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.image}</p>

            <div className="flex justify-center">
              <button
                className="bg-amber-400 text-white px-5 py-2 rounded-lg hover:bg-white hover:text-amber-400 hover:border hover:border-amber-400 transition duration-300"
                type="submit"
              >
                Add Vendor
              </button>
            </div>
            <p className="text-red-500 text-center">{error.form}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVen;