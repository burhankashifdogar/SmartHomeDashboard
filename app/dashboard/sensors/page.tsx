"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Droplets, RefreshCw, Thermometer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface SensorProps {
  id: string
  name: string
  room: string
  type: "temperature" | "humidity"
  icon: React.ElementType
  value: string
  status: "normal" | "warning" | "critical"
  statusText: string
  lastUpdated: Date
}

export default function SensorsPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sensors, setSensors] = useState<SensorProps[]>([
    {
      id: "temp-1",
      name: "Temperature",
      room: "Living Room",
      type: "temperature",
      icon: Thermometer,
      value: "28°C",
      status: "critical",
      statusText: "Above threshold",
      lastUpdated: new Date(),
    },
    {
      id: "temp-2",
      name: "Temperature",
      room: "Bedroom",
      type: "temperature",
      icon: Thermometer,
      value: "24°C",
      status: "normal",
      statusText: "Normal",
      lastUpdated: new Date(),
    },
    {
      id: "temp-3",
      name: "Temperature",
      room: "Kitchen",
      type: "temperature",
      icon: Thermometer,
      value: "26°C",
      status: "warning",
      statusText: "Slightly high",
      lastUpdated: new Date(),
    },
    {
      id: "humid-1",
      name: "Humidity",
      room: "Living Room",
      type: "humidity",
      icon: Droplets,
      value: "65%",
      status: "warning",
      statusText: "High humidity",
      lastUpdated: new Date(),
    },
    {
      id: "humid-2",
      name: "Humidity",
      room: "Bedroom",
      type: "humidity",
      icon: Droplets,
      value: "45%",
      status: "normal",
      statusText: "Normal",
      lastUpdated: new Date(),
    },
    {
      id: "humid-3",
      name: "Humidity",
      room: "Kitchen",
      type: "humidity",
      icon: Droplets,
      value: "70%",
      status: "critical",
      statusText: "Very high humidity",
      lastUpdated: new Date(),
    },
  ])

  // Simulate sensor updates with proper cleanup
  useEffect(() => {
    let isMounted = true
    const interval = setInterval(() => {
      if (!isMounted) return

      setSensors((prevSensors) =>
        prevSensors.map((sensor) => {
          if (sensor.type === "temperature") {
            const currentTemp = Number.parseInt(sensor.value.replace("°C", ""), 10)
            const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1)
            const newStatus = newTemp > 27 ? "critical" : newTemp > 25 ? "warning" : "normal"
            const newStatusText = newTemp > 27 ? "Above threshold" : newTemp > 25 ? "Slightly high" : "Normal"

            return {
              ...sensor,
              value: `${newTemp}°C`,
              status: newStatus as "normal" | "warning" | "critical",
              statusText: newStatusText,
              lastUpdated: new Date(),
            }
          } else if (sensor.type === "humidity") {
            const currentHumidity = Number.parseInt(sensor.value.replace("%", ""), 10)
            const newHumidity = currentHumidity + (Math.random() > 0.5 ? 2 : -2)
            const newStatus = newHumidity > 65 ? "critical" : newHumidity > 55 ? "warning" : "normal"
            const newStatusText =
              newHumidity > 65 ? "Very high humidity" : newHumidity > 55 ? "High humidity" : "Normal"

            return {
              ...sensor,
              value: `${newHumidity}%`,
              status: newStatus as "normal" | "warning" | "critical",
              statusText: newStatusText,
              lastUpdated: new Date(),
            }
          }
          return sensor
        }),
      )
    }, 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const refreshSensors = () => {
    setIsRefreshing(true)

    // Use a safer timeout approach
    const timeoutId = setTimeout(() => {
      if (timeoutId) {
        setSensors((prevSensors) =>
          prevSensors.map((sensor) => {
            if (sensor.type === "temperature") {
              const currentTemp = Number.parseInt(sensor.value.replace("°C", ""), 10)
              const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1)
              const newStatus = newTemp > 27 ? "critical" : newTemp > 25 ? "warning" : "normal"
              const newStatusText = newTemp > 27 ? "Above threshold" : newTemp > 25 ? "Slightly high" : "Normal"

              return {
                ...sensor,
                value: `${newTemp}°C`,
                status: newStatus as "normal" | "warning" | "critical",
                statusText: newStatusText,
                lastUpdated: new Date(),
              }
            } else if (sensor.type === "humidity") {
              const currentHumidity = Number.parseInt(sensor.value.replace("%", ""), 10)
              const newHumidity = currentHumidity + (Math.random() > 0.5 ? 2 : -2)
              const newStatus = newHumidity > 65 ? "critical" : newHumidity > 55 ? "warning" : "normal"
              const newStatusText =
                newHumidity > 65 ? "Very high humidity" : newHumidity > 55 ? "High humidity" : "Normal"

              return {
                ...sensor,
                value: `${newHumidity}%`,
                status: newStatus as "normal" | "warning" | "critical",
                statusText: newStatusText,
                lastUpdated: new Date(),
              }
            }
            return sensor
          }),
        )
        setIsRefreshing(false)
        toast({
          title: "Sensors refreshed",
          description: "All sensor data has been updated",
        })
      }
    }, 1500)

    return () => {
      clearTimeout(timeoutId)
    }
  }

  const rooms = Array.from(new Set(sensors.map((sensor) => sensor.room)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Sensors</h1>
        <Button variant="outline" size="sm" className="gap-1" onClick={refreshSensors} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          {rooms.map((room) => (
            <TabsTrigger key={room} value={room}>
              {room}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sensors.map((sensor) => (
              <SensorDetailCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </TabsContent>
        {rooms.map((room) => (
          <TabsContent key={room} value={room} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sensors
                .filter((sensor) => sensor.room === room)
                .map((sensor) => (
                  <SensorDetailCard key={sensor.id} sensor={sensor} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface SensorDetailCardProps {
  sensor: SensorProps
}

function SensorDetailCard({ sensor }: SensorDetailCardProps) {
  const Icon = sensor.icon
  const statusColors = {
    normal: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${statusColors[sensor.status]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base">{sensor.name}</CardTitle>
              <CardDescription>{sensor.room}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-4">
          <div className="text-4xl font-bold">{sensor.value}</div>
          <div
            className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${
              sensor.status === "normal"
                ? statusColors.normal
                : sensor.status === "warning"
                  ? statusColors.warning
                  : statusColors.critical
            }`}
          >
            {sensor.statusText}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">Last updated: {sensor.lastUpdated.toLocaleTimeString()}</div>
      </CardContent>
    </Card>
  )
}
