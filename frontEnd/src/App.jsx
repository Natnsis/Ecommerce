import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App

