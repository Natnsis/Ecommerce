"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getAllTransaction } from "@/app/conrollers/transaction.controller"


type Transaction = {
  id: number
  created_at: string
  amount: number
  status?: "pending" | "processing" | "success" | "failed"
}

type User = {
  id: string
  created_at: string
}

type ChartPoint = {
  date: string
  success: number
  other: number
  users: number
}

const chartConfig = {
  success: {
    label: "Successful Transactions",
    color: "var(--chart-1)",
  },
  other: {
    label: "Other Transactions",
    color: "var(--chart-2)",
  },
  users: {
    label: "New Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig


export function LineGraph() {
  const [range, setRange] = React.useState("30d")
  const [users, setUsers] = React.useState<User[]>([])

  const { data: transactions = [], isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["overall-order"],
    queryFn: getAllTransaction,
  })

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/get-users")
        const data = await res.json()
        // Check if the array is inside a 'users' property
        const usersArray = Array.isArray(data) ? data : data.users
        setUsers(usersArray.map((u: any) => ({ id: u.id, created_at: u.created_at })))
      } catch (err) {
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  const chartData = React.useMemo<ChartPoint[]>(() => {
    const map = new Map<string, ChartPoint>()

    transactions.forEach((tx) => {
      const date = tx.created_at.slice(0, 10)
      if (!map.has(date)) map.set(date, { date, success: 0, other: 0, users: 0 })
      const point = map.get(date)!
      if (tx.status === "success") {
        point.success += 1
      } else {
        point.other += 1
      }
    })

    // process users
    users.forEach((u) => {
      const date = u.created_at.slice(0, 10)
      if (!map.has(date)) map.set(date, { date, success: 0, other: 0, users: 0 })
      map.get(date)!.users += 1
    })

    const sorted = Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date))

    const days = range === "7d" ? 7 : range === "30d" ? 30 : 90
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)

    return sorted.filter((d) => new Date(d.date) >= cutoff)
  }, [transactions, users, range])

  if (isLoading) return <div>Loading chart…</div>
  if (error) return <div>Failed to load transactions</div>

  console.log(transactions)
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <div className="flex-1">
          <CardTitle>Transaction & User Activity</CardTitle>
          <CardDescription>
            Successful vs other transactions and new users over time
          </CardDescription>
        </div>

        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillOther" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-other)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-other)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              dataKey="success"
              type="monotone"
              fill="url(#fillSuccess)"
              stroke="var(--color-success)"
              stackId="a"
            />
            <Area
              dataKey="other"
              type="monotone"
              fill="url(#fillOther)"
              stroke="var(--color-other)"
              stackId="a"
            />
            <Area
              dataKey="users"
              type="monotone"
              fill="url(#fillUsers)"
              stroke="var(--color-users)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
