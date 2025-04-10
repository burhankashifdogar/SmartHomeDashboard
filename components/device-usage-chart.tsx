"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Living Room Lights", value: 8.5 },
  { name: "Kitchen Lights", value: 5.2 },
  { name: "Bedroom Lights", value: 4.7 },
  { name: "Living Room Fan", value: 12.3 },
  { name: "Bedroom Fan", value: 9.8 },
  { name: "TV", value: 6.5 },
  { name: "Router", value: 24 },
]

export function DeviceUsageChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Hours",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 10,
          bottom: 40,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          domain={[0, 24]}
          tickFormatter={(value) => `${value}h`}
        />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tickMargin={10} width={120} />
        <ChartTooltip content={<ChartTooltipContent indicator="bar" />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}
