"use client"

import type React from "react"

import { useState } from "react"
import { Fan, Lightbulb, Power, RefreshCw, Tv, WifiIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface DeviceProps {
  id: string
  name: string
  room: string
  type: string
  icon: React.ElementType
  status: boolean
  brightness?: number
  speed?: number
}

export default function DevicesPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [devices, setDevices] = useState<DeviceProps[]>([
    {
      id: "light-1",
      name: "Living Room Lights",
      room: "Living Room",
      type: "light",
      icon: Lightbulb,
      status: true,
      brightness: 80,
    },
    {
      id: "light-2",
      name: "Kitchen Lights",
      room: "Kitchen",
      type: "light",
      icon: Lightbulb,
      status: false,
      brightness: 60,
    },
    {
      id: "fan-1",
      name: "Living Room Fan",
      room: "Living Room",
      type: "fan",
      icon: Fan,
      status: true,
      speed: 2,
    },
    {
      id: "fan-2",
      name: "Bedroom Fan",
      room: "Bedroom",
      type: "fan",
      icon: Fan,
      status: false,
      speed: 1,
    },
    {
      id: "tv-1",
      name: "Living Room TV",
      room: "Living Room",
      type: "tv",
      icon: Tv,
      status: false,
    },
    {
      id: "wifi-1",
      name: "WiFi Router",
      room: "Office",
      type: "network",
      icon: WifiIcon,
      status: true,
    },
  ])

  const refreshDevices = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Devices refreshed",
        description: "All devices have been refreshed successfully",
      })
    }, 1500)
  }

  const toggleDevice = (id: string) => {
    setDevices(
      devices.map((device) => {
        if (device.id === id) {
          const newStatus = !device.status
          toast({
            title: `${device.name} ${newStatus ? "On" : "Off"}`,
            description: `The device has been turned ${newStatus ? "on" : "off"}`,
          })
          return { ...device, status: newStatus }
        }
        return device
      }),
    )
  }

  const updateBrightness = (id: string, value: number) => {
    setDevices(
      devices.map((device) => {
        if (device.id === id) {
          return { ...device, brightness: value }
        }
        return device
      }),
    )
  }

  const updateSpeed = (id: string, value: number) => {
    setDevices(
      devices.map((device) => {
        if (device.id === id) {
          return { ...device, speed: value }
        }
        return device
      }),
    )
  }

  const rooms = Array.from(new Set(devices.map((device) => device.room)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Devices</h1>
        <Button variant="outline" size="sm" className="gap-1" onClick={refreshDevices} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Devices</TabsTrigger>
          {rooms.map((room) => (
            <TabsTrigger key={room} value={room}>
              {room}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onToggle={() => toggleDevice(device.id)}
                onBrightnessChange={(value) => updateBrightness(device.id, value)}
                onSpeedChange={(value) => updateSpeed(device.id, value)}
              />
            ))}
          </div>
        </TabsContent>
        {rooms.map((room) => (
          <TabsContent key={room} value={room} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {devices
                .filter((device) => device.room === room)
                .map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onToggle={() => toggleDevice(device.id)}
                    onBrightnessChange={(value) => updateBrightness(device.id, value)}
                    onSpeedChange={(value) => updateSpeed(device.id, value)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface DeviceCardProps {
  device: DeviceProps
  onToggle: () => void
  onBrightnessChange?: (value: number) => void
  onSpeedChange?: (value: number) => void
}

function DeviceCard({ device, onToggle, onBrightnessChange, onSpeedChange }: DeviceCardProps) {
  const Icon = device.icon

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                device.status ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-base">{device.name}</CardTitle>
          </div>
          <Switch checked={device.status} onCheckedChange={onToggle} />
        </div>
        <CardDescription>{device.room}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm">
          <span>Status</span>
          <span className={`font-medium ${device.status ? "text-green-600" : "text-slate-500"}`}>
            {device.status ? "Online" : "Offline"}
          </span>
        </div>

        {device.type === "light" && device.brightness !== undefined && device.status && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Brightness</span>
              <span className="font-medium">{device.brightness}%</span>
            </div>
            <Slider
              value={[device.brightness]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => onBrightnessChange?.(value[0])}
            />
          </div>
        )}

        {device.type === "fan" && device.speed !== undefined && device.status && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Speed</span>
              <span className="font-medium">Level {device.speed}</span>
            </div>
            <Slider
              value={[device.speed]}
              min={1}
              max={3}
              step={1}
              onValueChange={(value) => onSpeedChange?.(value[0])}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full gap-1" onClick={onToggle}>
          <Power className="h-4 w-4" />
          {device.status ? "Turn Off" : "Turn On"}
        </Button>
      </CardFooter>
    </Card>
  )
}
