import MiddlePart from "@/components/MiddlePart";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { recentUsers } from "@/lib/constant";

const AdminHero = () => {
  return (
    <div className="flex gap-5 mt-5 h-[60vh]">
      <MiddlePart />
      <Card className="w-[25vw] h-full">
        <CardContent>
          <div className="flex justify-between">
            <h1 className="text-lg">Recent Users</h1>
            <Button variant="link">See all</Button>
          </div>
          <div className="mt-5 overflow-y-auto h-6/10">
            {recentUsers.map((r, index) => (
              <div className="flex justify-between pr-5 mt-2" key={index}>
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="grayscale"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h1>{r.name}</h1>
                    <p className="text-gray-500 pl-2">{r.lastTime}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <h1>{r.date}</h1>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminHero
