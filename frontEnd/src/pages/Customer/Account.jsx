import CaccountHead from "../../components/Customer/CaccountHead";
import Cfooter from "./../../components/Customer/Cfooter";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Account = () => {
  const [customerInfo, setCustomerInfo] = useState({});
  const [newInfo, setNewInfo] = useState({
    username: "",
    password: "",
    image: null,
  });

  ///TODO:fix info
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/userinfo", { withCredentials: true });
        setCustomerInfo(response.data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchCustomerInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewInfo((prevInfo) => ({
      ...prevInfo,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("username", newInfo.username || customerInfo.username);
    formData.append("password", newInfo.password || customerInfo.password);
    if (newInfo.image) {
      formData.append("image", newInfo.image);
    }

    try {
      const response = await axios.post("http://localhost:4000/updateUser", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Information updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update information.");
      }
    } catch (error) {
      console.error("Error updating customer info:", error);
      alert("An error occurred while updating information.");
    }
  };

  return (
    <div className="px-5 pt-5">
      <CaccountHead />

      {/* Update Section */}
      <div className="bg-sky-100 h-auto my-5 flex justify-center items-center p-10">
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Current Info Section */}
          <div className="bg-white rounded-lg w-full md:w-[40%] p-5 shadow-lg">
            <center>
              <label className="block font-bold mb-2">Current Image:</label>
              <img
                src={`../src/Uploads/customers/${customerInfo.image}`}
                alt="Current"
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <label className="block font-bold mb-2">Current Username:</label>
              <h1 className="text-gray-700 mb-4">{customerInfo.username}</h1>
              <label className="block font-bold mb-2">Current Password:</label>
              <h1 className="text-gray-700">{customerInfo.password}</h1>
            </center>
          </div>

          {/* Update Info Section */}
          <div className="bg-white rounded-lg w-full md:w-[40%] p-5 shadow-lg">
            <center className="space-y-4">
              <label className="block font-bold">New Image:</label>
              <input
                type="file"
                name="image"
                className="border px-3 py-2 rounded-lg w-full"
                onChange={handleChange}
              />
              <label className="block font-bold">New Username:</label>
              <input
                type="text"
                name="username"
                className="border px-3 py-2 rounded-lg w-full"
                placeholder="Enter new username"
                onChange={handleChange}
              />
              <label className="block font-bold">New Password:</label>
              <input
                type="password"
                name="password"
                className="border px-3 py-2 rounded-lg w-full"
                placeholder="Enter new password"
                onChange={handleChange}
              />
              <button
                className="bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition duration-300"
                onClick={handleUpdate}
              >
                Update
              </button>
              <Link
                to="/Cdash"
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Go Back
              </Link>
            </center>
          </div>
        </div>
      </div>

      <Cfooter />
    </div>
  );
};

export default Account;