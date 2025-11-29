import { notifications } from "@/assets/constants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const VNotifications = () => {
  return (
    <Card className="px-5">
      <h1 className="font-secondary-extrabold border-b">Notificatons</h1>
      <div className="h-[40vh] overflow-auto">
        {notifications.map((n, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center"><p>{index + 1}</p></div>
              <Button variant="outline" size="lg" className="w-4/5">
                <div className="flex justify-between gap-10 w-full">
                  <div className="flex gap-2 items-center">
                    <img src={n.img} className="w-8 rounded-full" />
                    <h1>{n.name}</h1>
                  </div>

                  <div className="flex items-center">
                    <Badge variant="destructive" className="w-fit">{n.notification}</Badge>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default VNotifications
