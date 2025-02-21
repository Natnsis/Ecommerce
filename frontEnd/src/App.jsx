import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Admin/Dashboard"
import ChangePass from "./pages/Admin/ChangePass"
import ManageVen from "./pages/Admin/ManageVen"
import AddVen from "./pages/Admin/AddVen"
import DashboardV from "./pages/Vendor/DashboardV"
import Outofstock from "./pages/Vendor/Outofstock"
import ChangePassV from "./pages/Vendor/ChangePassV"
import AddPro from "./pages/Vendor/AddPro"



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
        <Route path="/out" element={<Outofstock/>}/>
        <Route path="/addPro" element={<AddPro/>}/>
        <Route path="/changeV" element={<ChangePassV/>}/>
        
      </Routes>
    </Router>
  )
}

export default App

