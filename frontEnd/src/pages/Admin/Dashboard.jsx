import Count from "../../components/Admin/Count"
import Footer from "../../components/Admin/Footer"
import Header from "../../components/Admin/Header"
import {useState, useEffect } from 'react'
import axios from "axios";



const Dashboard = () => {
    const [vendors, setVendors] = useState([]);
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get("http://localhost:4000/listOfCustomers");
                setCustomers(response.data);
            } catch (err) {
                console.error("Error fetching vendor list:", err);
            }
        };

        fetchVendors();
    }, []);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get("http://localhost:4000/vendorlist");
                console.log(response.data); // Log the vendor data
                setVendors(response.data);
            } catch (err) {
                console.error("Error fetching vendor list:", err);
            }
        };

        fetchVendors();
    }, []);

  return (
    <div className="px-10 pt-10 space-y-15">
      <Header/>
      <Count/>

      {/* list of vendors */}
      <div className="pt-5 px-10 rounded-lg h-[100vh] overflow-scroll shadow-2xl">
        <h1 className="text-center font-extrabold text-2xl">List of vendors</h1>
        <div className="overflow-x-auto w-full flex justify-center mt-10 shadow-2xl h-fit">
            <table className="w-auto">
                <thead>
                  <tr className="border border-solid border-l-0 border-r-0 text-center ">
                    <th className="text-md px-15 py-3 ">Id</th>
                    <th className="text-md px-15 py-3 ">Full Name</th>
                    <th className="text-md px-15 py-3 ">Username</th>
                    <th className="text-md px-15 py-3 ">Number Of Products</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="text-md px-15 py-3">{vendor.id}</td>
                  <td className="text-md px-15 py-3">{vendor.fullName}</td>
                    <td className="text-md px-15 py-3">{vendor.username}</td>
                  <td className="text-md px-15 py-3">0</td>
                </tr>
              ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* list of customers */}
      <div className="py-5 px-10 rounded-lg h-[100vh] overflow-scroll shadow-2xl">
        <h1 className="text-center font-extrabold text-2xl">List of Customers</h1>
        <div className="overflow-x-auto w-full flex justify-center mt-10 shadow-2xl h-fit">
            <table className="w-auto">
                <thead>
                  <tr className="border border-solid border-l-0 border-r-0 text-center ">
                    <th className="text-md px-15 py-3 ">Id</th>
                    <th className="text-md px-15 py-3 ">Full Name</th>
                    <th className="text-md px-15 py-3 ">Username</th>
                    <th className="text-md px-15 py-3 ">Number Of Bought Products</th>
                  </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td className="text-md px-15 py-3">{customer.id}</td>
                        <td className="text-md px-15 py-3">{customer.fullName}</td>
                        <td className="text-md px-15 py-3">{customer.username}</td>
                        <td className="text-md px-15 py-3">{customer.numberOfBoughtProducts}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>

      <Footer/>

    </div>
  )
}

export default Dashboard
