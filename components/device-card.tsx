"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface DeviceCardProps {
  icon: LucideIcon
  title: string
  initialState: boolean
  onToggle: (state: boolean) => void
}

export function DeviceCard({ icon: Icon, title, initialState, onToggle }: DeviceCardProps) {
  const [isOn, setIsOn] = useState(initialState)

  const handleToggle = (checked: boolean) => {
    setIsOn(checked)
    onToggle(checked)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                isOn ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Switch checked={isOn} onCheckedChange={handleToggle} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span>Status</span>
          <span className={`font-medium ${isOn ? "text-green-600" : "text-slate-500"}`}>{isOn ? "On" : "Off"}</span>
        </div>
      </CardContent>
    </Card>
  )
}
