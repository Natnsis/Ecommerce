import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    form: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
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
      username: "",
      password: "",
      form: "",
    };

    if (!credentials.username) {
      newError.username = "Enter the username";
      hasError = true;
    }
    if (!credentials.password) {
      newError.password = "Enter the password";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/login", credentials, { withCredentials: true });
      console.log(response.data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        if (response.data.role === "admin") {
          navigate("/Adash");
        } else if (response.data.role === "vendor") {
          navigate("/Vdash");
        } else if (response.data.role === "customer") {
          navigate("/Cdash");
        }
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during login.",
      }));
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-bl from-blue-300 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl px-8 py-10 shadow-lg">
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl text-center text-gray-800">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 px-5 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
            />
            <p className="text-red-500 text-center">{error.username}</p>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 px-5 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
            />
            <p className="text-red-500 text-center">{error.password}</p>
          </div>
          <div className="w-full flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-300 text-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-300 hover:border hover:border-blue-300 transition duration-300"
            >
              Submit
            </button>
          </div>
          <p className="text-red-500 text-center mt-3">{error.form}</p>
        </form>
        <div className="mt-6">
          <p className="text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register">
              <span className="text-blue-500 hover:text-red-500 transition duration-300">Register Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;