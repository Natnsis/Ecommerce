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
    <div className="px-10 pt-10">
      <Header />
      <div className="flex justify-between items-center px-20 pt-10">
        <div>
          <h1 className="text-3xl font-extrabold">Add New Vendors</h1>
        </div>
        <div>
          <button className="bg-amber-300 px-3 py-1 hover:border hover:bg-white rounded-lg">
            <Link to="/manageVen">Go Back</Link>
          </button>
        </div>
      </div>
      <div className="flex mt-15 justify-center items-center ">
        <div className="px-10 py-5 shadow-2xl rounded-lg space-y-2">
          <form onSubmit={handleAdding}>
            <input
              className="border border-amber-300 px-5 py-1 text-center rounded-lg w-full mb-2"
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={vendor.fullName}
              onChange={handleChange}
            />
            <br />
            <p className="text-center text-red-500">{error.fullName}</p>

            <input
              className="border border-amber-300 px-5 py-1 text-center rounded-lg w-full mb-2"
              type="text"
              placeholder="Enter Username"
              name="username"
              value={vendor.username}
              onChange={handleChange}
            />
            <br />
            <p className="text-center text-red-500">{error.username}</p>

            <input
              className="border border-amber-300 px-5 py-1 text-center rounded-lg w-full mb-2"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={vendor.password}
              onChange={handleChange}
            />
            <br />
            <p className="text-center text-red-500">{error.password}</p>

            <p className="text-center">Enter image of vendor</p>
            <input
              className="hover:bg-black hover:text-white px-3 border mb-2"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <br />
            <p className="text-center text-red-500">{error.image}</p>

            <div className="flex justify-center">
              <button
                className="bg-amber-300 px-3 py-1 hover:border hover:bg-white rounded-lg"
                type="submit"
              >
                Add
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