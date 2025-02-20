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
        <table border="1">
            <td>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </td>
            <td>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </td>
            <td>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </td>
        </table>
      </div>

      {/* list of customers */}
      <div className="py-5 px-10 rounded-lg h-[100vh] overflow-scroll shadow-2xl">
        <h1 className="text-center font-extrabold text-2xl">List of Customers</h1>
        <table border="1">
            <td>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </td>
            <td>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </td>
            <td>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </td>
        </table>
      </div>

      <Footer/>

    </div>
  )
}

export default Dashboard
