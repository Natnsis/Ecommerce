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

  return (
    <div className="px-10 pt-10">
      <Header />

      {/* vendor header */}
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-4xl font-extrabold">Vendors</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border-amber-300 border-3 rounded-2xl px-5"
          />
          <button className="bg-amber-300 rounded-lg hover:bg-white hover:border px-3 py-1 mx-5">
            search
          </button>
        </div>
        <div>
          <button className="bg-amber-300 rounded-lg hover:bg-white hover:border px-3 py-1 mx-5">
            <Link to="/addVen">Add Vendors</Link>
          </button>
        </div>
      </div>

      {/* vendor List */}
      <div className="rounded-lg mt-10 h-screen p-10 shadow-2xl">
        <h1 className="text-center text-2xl font-extrabold">All available Vendors</h1>
        <div className="overflow-x-auto w-full flex justify-center mt-10 shadow-2xl h-fit">
          <table className="w-auto">
            <thead>
              <tr className="border border-solid border-l-0 border-r-0 ">
                <th className="text-md px-15 py-3 ">id</th>
                <th className="text-md px-15 py-3 ">image</th>
                <th className="text-md px-15 py-3 ">Full Name</th>
                <th className="text-md px-15 py-3 ">Username</th>
                <th className="text-md px-40 py-3 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="text-md px-15 py-3">{vendor.id}</td>
                  <td className="text-md px-15 py-3">
                    <img src={`../src/Uploads/vendors/${vendor.image}`} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="text-md px-15 py-3">{vendor.fullname}</td>
                  <td className="text-md px-15 py-3">{vendor.username}</td>
                  <td className="text-md px-40 py-3">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 mx-1">
                      <Link to={`/updateVendor/${vendor.id}`}>Update</Link>
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 mx-1"
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

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ManageVen;