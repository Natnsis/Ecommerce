import { feedbacks } from "@/assets/constants";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AdminFeedbacks = () => {
  return <section className="flex">
    <Sidebar />
    <div className="p-10 w-full">
      <h1 className="font-quater">Feedbacks from customers</h1>
      <div className="flex w-full mt-5 border rounded-lg p-5 justify-between">
        <div className="border-r w-1/3 pr-5">
          <Input placeholder="search..." />
          <div className="mt-5 overflow-auto h-[60vh] ">
            {feedbacks.map((f, index) => (
              <Button variant="ghost" className="py-1 flex justify-between w-full my-5" key={index}>
                <div className="flex gap-1 items-center">
                  <img src={f.img} className="w-10 h-10 rounded-full" />
                  <h1 className="font-primary text-lg">{f.fName} {f.lName}</h1>
                </div>
                <div className="text-sm font-primary">
                  <p>{f.time}</p>
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                    variant="destructive"
                  >
                    {f.notification}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="w-2/3 px-5">
          <div className="border-b pb-2 mb-5">
            <h1 className="font-secondary-bold text-2xl">Minale Awoke</h1>
          </div>
          <Card className="h-[50vh] overflow-auto my-5 px-5">
            note
          </Card>
          <div className="flex justify-center">
            <Button className="w-2/4">Respond</Button>
          </div>
        </div>
      </div>
    </div>
  </section>;
};

export default AdminFeedbacks;
