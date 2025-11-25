import { LogOut } from "lucide-react"
import { Button } from "./ui/button"

const Sidebar = () => {
  return (
    <div className="p-5 flex flex-col justify-between items-center h-screen border-r">
      <div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="font-secondary-extrabold text-2xl">Gebeya</h1>
          <img src="/admin.jpg" className="w-20 h-20 rounded-full border my-3" />
          <h1 className="font-quater">Admin</h1>
          <p className="font-primary text-sm text-center">vendors and overall manager</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Vendors</Button>
          <Button variant="ghost">Feedbacks</Button>
          <Button variant="ghost">Products</Button>
        </div>
      </div>

      <div className="flex gap-3 items-center cursor-pointer">
        <LogOut size={20} />
        <p>log out</p>
      </div>
    </div>
  )
}

export default Sidebar
