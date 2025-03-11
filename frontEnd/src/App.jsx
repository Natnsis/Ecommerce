import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Admin/Dashboard"
import ChangePass from "./pages/Admin/ChangePass"
import ManageVen from "./pages/Admin/ManageVen"
import AddVen from "./pages/Admin/AddVen"
import DashboardV from "./pages/Vendor/DashboardV"
import ChangePassV from "./pages/Vendor/ChangePassV"
import AddPro from "./pages/Vendor/AddPro"
import Cdash from "./pages/Customer/Cdash"
import Search from "./pages/Customer/Search"
import Feedback from "./pages/Customer/Feedback"
import Cart from "./pages/Customer/Cart"
import Account from "./pages/Customer/Account"
import UpdateVen from "./pages/Admin/UpdateVen"
import UpdatePro from "./pages/Vendor/UpdatePro"
import Detail from "./pages/Customer/Detail"



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Adash" element={<Dashboard/>}/>
        <Route path="/change" element={<ChangePass/>}/>
        <Route path="/manageVen" element={<ManageVen/>}/>
        <Route path="/addVen" element={<AddVen/>}/>
        <Route path="/Vdash" element={<DashboardV/>}/>
        <Route path="/addPro" element={<AddPro/>}/>
        <Route path="/changeV" element={<ChangePassV/>}/>
        <Route path="/Cdash" element={<Cdash/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/updateVendor/:id" element={<UpdateVen/>}/>
        <Route path="/updateProduct/:id" element={<UpdatePro/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>

        
      </Routes>
    </Router>
  )
}

export default App

