import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Admin/Header";

const UpdateVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/vendorlist/${id}`);
        setVendor(response.data);
      } catch (err) {
        console.error("Error fetching vendor details:", err);
      }
    };

    fetchVendor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVendor((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
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

    if (hasError) {
      setError(newError);
      return;
    }

    const data = new FormData();
    data.append("username", vendor.username);
    data.append("password", vendor.password);
    data.append("fullName", vendor.fullName);
    if (vendor.image) {
      data.append("image", vendor.image);
    }

    try {
      const response = await axios.put(`http://localhost:4000/updateVendor/${id}`, data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        alert("Vendor updated successfully");
        navigate("/manageVen");
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during the update.",
      }));
    }
  };

  return (
    <div className="px-10 pt-10 h-screen w-screen">
      <Header />
      <div className="flex justify-center items-center">
        <div className="h-fit shadow-lg mt-20 px-5 py-10 space-y-3">
          <h1 className="font-extrabold text-3xl text-center">Update Vendor</h1>
          <form onSubmit={handleSubmit}>
            <center>

            <input
              type="text"
              name="username"
              className="px-5 border-b-1 py-2 text-center"
              placeholder="Enter Username"
              value={vendor.username}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.username}</p>
            <input
              type="password"
              name="password"
              className="px-5 border-b-1 py-2"
              placeholder="Enter Password"
              value={vendor.password}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.password}</p>
            <input
              type="text"
              name="fullName"
              className="px-5 border-b-1 py-2"
              placeholder="Enter Full Name"
              value={vendor.fullName}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.fullName}</p>
            <p className="text-center">Enter image of vendor</p>
            <input
              className="hover:bg-black hover:text-white px-3 border mb-2"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.image}</p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-bold bg-amber-300 px-3 py-1 mt-3 rounded hover:bg-white hover:border"
              >
                Update
              </button>
            </div>
            </center>
            <p className="text-center text-red-500">{error.form}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVendor;