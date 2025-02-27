import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [customer, setCustomer] = useState({
    username: "",
    password: "",
    fullName: "",
    image: null,
    email: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    fullName: "",
    image: "",
    email: "",
    form: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCustomer((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleRegistrtion = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = {
      username: "",
      password: "",
      fullName: "",
      image: "",
      email: "",
      form: "",
    };

    if (!customer.username) {
      newError.username = "Enter the username";
      hasError = true;
    }
    if (!customer.password) {
      newError.password = "Enter the password";
      hasError = true;
    }
    if (!customer.fullName) {
      newError.fullName = "Enter the full name";
      hasError = true;
    }
    if (!customer.image) {
      newError.image = "Select an image";
      hasError = true;
    }
    if (!customer.email) {
      newError.email = "Enter the email";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    const data = new FormData();
    data.append("username", customer.username);
    data.append("password", customer.password);
    data.append("fullName", customer.fullName);
    data.append("image", customer.image);
    data.append("email", customer.email);

    try {
      const response = await axios.post("http://localhost:4000/register", data);
      console.log(response.data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        // Handle successful registration and redirect to login page
        navigate("/login");
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during registration.",
      }));
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-300 to-gray-100">
      <div className="w-85 bg-white h-fit rounded-2xl px-5 py-5">
        <div className="my-5">
          <h1 className="font-extrabold text-3xl text-center">Registration</h1>
        </div>
        <form onSubmit={handleRegistrtion} className="space-y-2">
          <input
            type="text"
            name="username"
            className="w-70 border px-5 py-1 rounded text-center"
            placeholder="Enter username"
            value={customer.username}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.username}</p>

          <input
            type="password"
            name="password"
            className="w-70 border px-5 py-1 rounded text-center"
            placeholder="Enter Password"
            value={customer.password}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.password}</p>

          <input
            type="text"
            name="fullName"
            className="w-70 border px-5 py-1 rounded text-center"
            placeholder="Enter Full Name"
            value={customer.fullName}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.fullName}</p>

          <label className="text-center w-full">Select your profile image</label>
          <input
            type="file"
            name="image"
            className="cursor-pointer border px-3 rounded-lg hover:bg-blue-300"
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.image}</p>

          <input
            type="email"
            name="email"
            className="w-70 border px-5 py-1 rounded text-center"
            placeholder="Enter Email"
            value={customer.email}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.email}</p>

          <div className="w-full flex justify-center my-3">
            <button
              type="submit"
              className="bg-blue-300 rounded px-3 py-1 hover:bg-white hover:border"
            >
              Register
            </button>
          </div>
          <p className="text-red-500 text-center">{error.form}</p>
        </form>
        <div>
          <p className="text-center">
            You already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-300 hover:text-red-300">Login Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;