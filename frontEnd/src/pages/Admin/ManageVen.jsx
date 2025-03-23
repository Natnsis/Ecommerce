import { useEffect, useState } from "react";
import Footer from "../../components/Admin/Footer";
import Header from "../../components/Admin/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageVen = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/vendorlist");
        setVendors(response.data);
      } catch (err) {
        console.error("Error fetching vendor list:", err);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteVendor/${id}`);
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    } catch (err) {
      console.error("Error deleting vendor:", err);
    }
  };

 console.log(vendors.image)

  return (
    <div className="px-10 pt-10 min-h-screen flex flex-col">
      <Header />

      {/* Vendor Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-5 space-y-5 md:space-y-0">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">Vendors</h1>
        </div>
        
        <div>
          <button className="bg-amber-300 rounded-lg hover:bg-white hover:border hover:border-amber-400 px-3 py-2 transition duration-300">
            <Link to="/addVen">Add Vendors</Link>
          </button>
        </div>
      </div>

      {/* Vendor List */}
      <div className="rounded-lg mt-10 p-10 shadow-2xl bg-white flex-grow">
        <h1 className="text-center text-2xl font-extrabold text-gray-800">All Available Vendors</h1>
        <div className="overflow-x-auto w-full flex justify-center mt-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-md px-5 py-3">ID</th>
                <th className="text-md px-5 py-3">Image</th>
                <th className="text-md px-5 py-3">Full Name</th>
                <th className="text-md px-5 py-3">Username</th>
                <th className="text-md px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-100">
                  <td className="text-md px-5 py-3">{vendor.id}</td>
                  <td className="text-md px-5 py-3">
                    <img
                      src={`../src/Uploads/vendors/${vendor.image}`}
                      alt="Vendor"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="text-md px-5 py-3">{vendor.fullname}</td>
                  <td className="text-md px-5 py-3">{vendor.username}</td>
                  <td className="text-md px-5 py-3 flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300">
                      <Link to={`/updateVendor/${vendor.id}`}>Update</Link>
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300"
                      onClick={() => handleDelete(vendor.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageVen;