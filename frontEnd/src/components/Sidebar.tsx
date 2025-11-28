import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className="p-5 flex flex-col justify-between items-center h-screen border-r w-60">
      <div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="font-secondary-extrabold text-2xl">Gebeya</h1>
          <img src="/admin.jpg" className="w-20 h-20 rounded-full border my-3" />
          <h1 className="font-quater">Hello, Admin!</h1>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button variant="ghost" onClick={() => navigate('/adash')}>Dashboard</Button>
          <Button variant="ghost" onClick={() => navigate('/avendor')}>Vendors</Button>
          <Button variant="ghost" onClick={() => navigate('/afeedback')}>Feedbacks</Button>
        </div>
      </div>

      <Button className="flex gap-3 items-center cursor-pointer" onClick={() => navigate("/login")}>
        <LogOut size={20} />
        <p>log out</p>
      </Button>
    </div>
  )
}

export default Sidebar
