"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Living Room Lights", value: 2.3 },
  { name: "Kitchen Lights", value: 1.8 },
  { name: "Bedroom Lights", value: 1.2 },
  { name: "Living Room Fan", value: 3.5 },
  { name: "Bedroom Fan", value: 2.7 },
  { name: "TV", value: 4.2 },
  { name: "Router", value: 1.1 },
]

export function EnergyUsageChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Energy (kWh)",
          color: "hsl(var(--chart-1))",
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
          domain={[0, 5]}
          tickFormatter={(value) => `${value} kWh`}
        />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tickMargin={10} width={120} />
        <ChartTooltip content={<ChartTooltipContent indicator="bar" />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}
