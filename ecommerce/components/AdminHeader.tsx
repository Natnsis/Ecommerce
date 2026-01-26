import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const AdminHeader = () => {
  return (
    <header className="flex justify-between px-5">
      <div>
        <h1 className="text-xl font-bold">Welcome Back!</h1>
        <p className="text-gray-600 text-sm">Manage the platfrom with freedom</p>
      </div>
      <div className="flex gap-3">
        <Avatar className="h-15 w-10">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-gray-600">Admin</h1>
          <p className="text-gray-600 text-sm">nsisay49@gmail.com</p>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
