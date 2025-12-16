
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

export function ChartPie() {
  return (
    <Card className="flex flex-row h-[200px] items-center p-3 gap-4">
      <div className="w-[130px] h-[130px] flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <PieChart width={130} height={130}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={40}
              outerRadius={60}
              strokeWidth={5} />
          </PieChart>
        </ChartContainer>
      </div>

      {/* RIGHT — Titles + footer */}
      <div className="flex flex-col flex-1 h-full justify-between py-1">
        <div>
          <CardTitle className="text-base">Categories</CardTitle>
          <CardDescription className="font-primary text-xs">
            Monthly update
          </CardDescription>
        </div>

        <CardFooter className="flex-col items-start gap-1 text-[10px] p-0 mt-auto">
          <div className="flex items-center gap-1 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-3 w-3" />
          </div>
          <div className="text-muted-foreground leading-none text-[9px]">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
