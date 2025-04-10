"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", livingRoom: 23, bedroom: 22, kitchen: 21 },
  { time: "02:00", livingRoom: 22, bedroom: 21, kitchen: 20 },
  { time: "04:00", livingRoom: 21, bedroom: 20, kitchen: 19 },
  { time: "06:00", livingRoom: 22, bedroom: 21, kitchen: 20 },
  { time: "08:00", livingRoom: 23, bedroom: 22, kitchen: 21 },
  { time: "10:00", livingRoom: 25, bedroom: 23, kitchen: 24 },
  { time: "12:00", livingRoom: 27, bedroom: 24, kitchen: 26 },
  { time: "14:00", livingRoom: 28, bedroom: 25, kitchen: 27 },
  { time: "16:00", livingRoom: 27, bedroom: 24, kitchen: 26 },
  { time: "18:00", livingRoom: 26, bedroom: 23, kitchen: 25 },
  { time: "20:00", livingRoom: 25, bedroom: 23, kitchen: 24 },
  { time: "22:00", livingRoom: 24, bedroom: 22, kitchen: 23 },
]

export function TemperatureChart() {
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
          domain={[15, 30]}
          tickFormatter={(value) => `${value}°C`}
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
