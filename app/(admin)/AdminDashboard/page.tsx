import { ChartLineDots } from "@/components/diagrams/chartLine";
import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-5 p-5 w-full h-full overflow-auto">
        <div className="h-screen flex flex-col p-5">
          <div className="flex items-end justify-between pr-10">
            <h1 className="font-quater text-4xl">Dashboard</h1>
            <ModeToggle />
          </div>

          <div className="flex justify-between mt-10 gap-10 px-15">
            <div className="flex flex-col gap-2 w-fit">
              <p className="font-primary">Products</p>
              <Separator />
              <h1 className="font-quater text-center">324</h1>
            </div>

            <div className="flex flex-col gap-2 w-fit">
              <p className="font-primary">Transactions</p>
              <Separator />
              <h1 className="font-quater text-center">1239</h1>
            </div>
            <div className="flex flex-col gap-2 w-fit">
              <p className="font-primary">Feedbacks</p>
              <Separator />
              <h1 className="font-quater text-center">234</h1>
            </div>
          </div>

          <div className="mt-5">
            <ChartLineDots />
          </div>
        </div>

        <div className="h-screen flex flex-col gap-5 p-3">
          <Card className="h-[40vh] flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity</CardDescription>
              <CardAction>
                <a className="text-sm text-primary hover:underline">View all</a>
              </CardAction>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[42vh] px-0">
              <ol className="divide-y">
                {[
                  {
                    id: 1,
                    user: "Jenny Doe",
                    total: "$122.25",
                    status: "completed",
                  },
                  {
                    id: 2,
                    user: "Michael Smith",
                    total: "$48.99",
                    status: "pending",
                  },
                  {
                    id: 3,
                    user: "Sasha Y",
                    total: "$211.50",
                    status: "completed",
                  },
                  {
                    id: 4,
                    user: "Karim",
                    total: "$18.50",
                    status: "refunded",
                  },
                ].map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between gap-4 py-3 px-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {tx.user.split(" ")[0][0]}
                      </div>
                      <div>
                        <p className="font-medium">{tx.user}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          {tx.status}
                          <span
                            className={
                              "ml-2 inline-block py-0.5 px-2 text-xs rounded-md " +
                              (tx.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : tx.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700")
                            }
                          />
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{tx.total}</div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="h-[45vh] flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle>Top Sellers</CardTitle>
              <CardDescription>Best sellers this month</CardDescription>
              <CardAction>
                <a className="text-sm text-primary hover:underline">
                  View report
                </a>
              </CardAction>
            </CardHeader>

            <CardContent className="px-0 overflow-y-auto max-h-[42vh]">
              <ul className="space-y-3 px-6">
                {[
                  {
                    id: 1,
                    name: "Olivia C",
                    sales: 421,
                  },
                  {
                    id: 2,
                    name: "Noah P",
                    sales: 352,
                  },
                  {
                    id: 3,
                    name: "Emma R",
                    sales: 300,
                  },
                ].map((seller) => (
                  <li
                    key={seller.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {seller.name.split(" ")[0][0]}
                      </div>
                      <div>
                        <p className="font-medium">{seller.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {seller.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{seller.sales}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
