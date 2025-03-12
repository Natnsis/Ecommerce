import { useState } from "react";
import Header from "../../components/Admin/Header";
import axios from "axios";

const ChangePass = () => {
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
      const response = await axios.post("http://localhost:4000/change-password-admin", formData);
      console.log(response.data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        alert("Password changed successfully");
        
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during password change.",
      }));
    }
  };

  return (
    <div className="px-10 pt-10 h-screen w-screen">
      <Header />
      <div className="flex justify-center items-center">
        <div className="h-fit shadow-lg mt-20 px-5 py-10 space-y-3">
          <h1 className="font-extrabold text-3xl text-center">Change password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="currentPassword"
              className="px-5 border-b-1 py-2"
              placeholder="Enter Current password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.currentPassword}</p>
            <input
              type="password"
              name="newPassword"
              className="px-5 border-b-1 py-2"
              placeholder="Enter new Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.newPassword}</p>
            <input
              type="password"
              name="confirmPassword"
              className="px-5 border-b-1 py-2"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <p className="text-center text-red-500">{error.confirmPassword}</p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-bold bg-amber-300 px-3 py-1 mt-3 rounded hover:bg-white hover:border"
              >
                Change
              </button>
            </div>
            <p className="text-center text-red-500">{error.form}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;