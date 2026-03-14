"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CustomDateRangePicker } from "../common/CustomDateRangePicker"
const chartData = [
  { month: "January", revenue: 186, expenses: 80 },
  { month: "February", revenue: 305, expenses: 200 },
  { month: "March", revenue: 237, expenses: 120 },
  { month: "March", revenue: 237, expenses: 120 },
  { month: "April", revenue: 73, expenses: 190 },
  { month: "May", revenue: 209, expenses: 130 },
  { month: "May", revenue: 209, expenses: 130 },
  { month: "June", revenue: 214, expenses: 140 },
  { month: "June", revenue: 214, expenses: 140 },
  { month: "June", revenue: 214, expenses: 140 },
  { month: "June", revenue: 214, expenses: 140 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#171717",
  },
  expenses: {
    label: "Expenses",
    color: "#888888",
  },
}

export function RevenueVsExpenses() {
  return (
    <div className="">
      <div className="flex justify-between items-center">
         <p className="text-2xl font-bold py-5">Revenue vs Expenses</p>
         <CustomDateRangePicker />
      </div>
    <ChartContainer config={chartConfig} className="h-[400px] w-full bg-white p-5 rounded-2xl py-5">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>
  )
}
