import Count from "../../components/Admin/Count"
import Footer from "../../components/Admin/Footer"
import Header from "../../components/Admin/Header"

const Dashboard = () => {
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
                  <tr>
                    <td className="text-md px-15 py-3">1</td>
                    <td className="text-md px-15 py-3">Natnael</td>
                    <td className="text-md px-15 py-3">Nati</td>
                    <td className="text-md px-15 py-3">5</td>
                  </tr>
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
                    <th className="text-md px-15 py-3 ">Number Of Products</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-md px-15 py-3">1</td>
                    <td className="text-md px-15 py-3">Natnael</td>
                    <td className="text-md px-15 py-3">Nati</td>
                    <td className="text-md px-15 py-3">5</td>
                  </tr>
                </tbody>
            </table>
        </div>
      </div>

      <Footer/>

    </div>
  )
}

export default Dashboard
