import CaccountHead from "../../components/Customer/CaccountHead";
import Cfooter from "./../../components/Customer/Cfooter";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";

const Account = () => {
  const { translations } = useContext(LanguageContext); // Access translations
  const [customerInfo, setCustomerInfo] = useState({});
  const [newInfo, setNewInfo] = useState({
    username: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user-info", { withCredentials: true });
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
        alert(translations.updateSuccess); // Use translation for success message
        window.location.reload();
      } else {
        alert(translations.updateFailed); // Use translation for failure message
      }
    } catch (error) {
      console.error("Error updating customer info:", error);
      alert(translations.updateError); // Use translation for error message
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
              <label className="block font-bold mb-2">{translations.currentImage}:</label>
              <img
                src={`../src/Uploads/customers/${customerInfo.image}`}
                alt={translations.currentImage}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <label className="block font-bold mb-2">{translations.currentUsername}:</label>
              <h1 className="text-gray-700 mb-4">{customerInfo.username}</h1>
            </center>
          </div>

          {/* Update Info Section */}
          <div className="bg-white rounded-lg w-full md:w-[40%] p-5 shadow-lg">
            <center className="space-y-4">
              <label className="block font-bold">{translations.newImage}:</label>
              <input
                type="file"
                name="image"
                className="border px-3 py-2 rounded-lg w-full"
                onChange={handleChange}
              />
              <label className="block font-bold">{translations.newUsername}:</label>
              <input
                type="text"
                name="username"
                className="border px-3 py-2 rounded-lg w-full"
                placeholder={translations.enterNewUsername}
                onChange={handleChange}
              />
              <label className="block font-bold">{translations.newPassword}:</label>
              <input
                type="password"
                name="password"
                className="border px-3 py-2 rounded-lg w-full"
                placeholder={translations.enterNewPassword}
                onChange={handleChange}
              />
              <button
                className="bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition duration-300"
                onClick={handleUpdate}
              >
                {translations.update}
              </button>
              <Link
                to="/Cdash"
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                {translations.goBack}
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