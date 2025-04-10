"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", livingRoom: 55, bedroom: 50, kitchen: 60 },
  { time: "02:00", livingRoom: 54, bedroom: 49, kitchen: 59 },
  { time: "04:00", livingRoom: 53, bedroom: 48, kitchen: 58 },
  { time: "06:00", livingRoom: 52, bedroom: 47, kitchen: 57 },
  { time: "08:00", livingRoom: 53, bedroom: 48, kitchen: 58 },
  { time: "10:00", livingRoom: 55, bedroom: 50, kitchen: 60 },
  { time: "12:00", livingRoom: 58, bedroom: 52, kitchen: 63 },
  { time: "14:00", livingRoom: 62, bedroom: 55, kitchen: 67 },
  { time: "16:00", livingRoom: 65, bedroom: 57, kitchen: 70 },
  { time: "18:00", livingRoom: 63, bedroom: 56, kitchen: 68 },
  { time: "20:00", livingRoom: 60, bedroom: 54, kitchen: 65 },
  { time: "22:00", livingRoom: 57, bedroom: 52, kitchen: 62 },
]

export function HumidityChart() {
  return (
    <ChartContainer
      config={{
        livingRoom: {
          label: "Living Room",
          color: "hsl(var(--chart-1))",
        },
        bedroom: {
          label: "Bedroom",
          color: "hsl(var(--chart-2))",
        },
        kitchen: {
          label: "Kitchen",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          domain={[40, 80]}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="livingRoom"
          stroke="var(--color-livingRoom)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="bedroom"
          stroke="var(--color-bedroom)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="kitchen"
          stroke="var(--color-kitchen)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ChartContainer>
  )
}
