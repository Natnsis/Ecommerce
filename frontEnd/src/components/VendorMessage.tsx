import { notifications } from "@/assets/constants"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"

const VendorMessage = () => {
  const sent = '';
  const received = '';
  return (
    <div className="mt-10 px-10 h-screen">
      <div className="border h-[80vh] rounded grid grid-cols-6 ">
        <div className="grid col-span-2 p-5 border-r h-[95%]">
          <div className="flex flex-col gap-3">
            <div className="border-b pb-2">
              <h1 className="font-secondary-bold text-xl mb-3">Chat With Customers</h1>
              <Input placeholder="Search for customers chat" className="border-b" />
            </div>
            <div className="h-[60vh] overflow-auto flex flex-col gap-5">
              {notifications.map((n, index) => (
                <Button key={index} variant="outline" size="lg" className="flex justify-between w-full">
                  <div className="flex gap-2 items-center font-primary">
                    <img src={n.img} className="w-10 h-10 rounded-full" />
                    <p>{n.name}</p>
                  </div>
                  <div>
                    <Badge>
                      {n.notification}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid col-span-4 px-5 py-1">
          <div>
            <div className="flex justify-between h-fit pb-2">
              <div className="flex gap-5 items-center font-secondary-extrabold text-lg">
                <img src="/admin.jpg" className="w-10 h-10" />
                <div>
                  <h1>Alemu Kassahun</h1>
                  <p className="text-green-400 text-xs font-primary text-center">typing...</p>
                </div>
              </div>
            </div>
            <div className=" h-[85%]">
              <Card className="h-full">

              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorMessage
