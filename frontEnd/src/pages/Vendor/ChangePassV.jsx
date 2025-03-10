import { useState } from "react";
import Vheader from "../../components/Vendor/Vheader";
import axios from "axios"

const ChangePassV = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    form: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      form: "",
    };

    if (!formData.currentPassword) {
      newError.currentPassword = "Enter the current password";
      hasError = true;
    }
    if (!formData.newPassword) {
      newError.newPassword = "Enter the new password";
      hasError = true;
    }
    if (!formData.confirmPassword) {
      newError.confirmPassword = "Confirm the new password";
      hasError = true;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/change-password", formData);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        // Handle successful password change (e.g., show success message)
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during password change.",
      }));
    }
  };

  return (
    <div className="pt-5 px-5">
      <Vheader />
      {/* change password form */}
      <div className="flex justify-center items-center h-[80vh] mt-10">
        <div className="rounded-lg shadow-2xl w-[60%] h-fit p-5">
          <center className="space-y-3">
            <h1 className="text-3xl font-bold">Change Password</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="currentPassword">Enter Current Password: </label>
              <input
                type="password"
                name="currentPassword"
                className="border border-gray-200 rounded-sm px-2 py-1"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <p className="text-red-500">{error.currentPassword}</p>

              <label htmlFor="newPassword">Enter New Password: </label>
              <input
                type="password"
                name="newPassword"
                className="border border-gray-200 rounded-sm px-2 py-1 mt-3"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <p className="text-red-500">{error.newPassword}</p>

              <label htmlFor="confirmPassword">Confirm New Password: </label>
              <input
                type="password"
                name="confirmPassword"
                className="border border-gray-200 rounded-sm px-2 py-1 mt-3"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <p className="text-red-500">{error.confirmPassword}</p>

              <button
                type="submit"
                className="bg-black text-white px-3 py-1 mt-3 rounded-sm hover:text-black hover:bg-white hover:border hover:border-gray-300"
              >
                Change
              </button>
              <p className="text-red-500">{error.form}</p>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};

export default ChangePassV;