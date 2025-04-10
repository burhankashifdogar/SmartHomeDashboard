"use client"

import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SensorCardProps {
  icon: LucideIcon
  title: string
  value: string
  status: "normal" | "warning" | "critical"
  statusText: string
}

export function SensorCard({ icon: Icon, title, value, status, statusText }: SensorCardProps) {
  const statusColors = {
    normal: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    critical: "bg-red-100 text-red-700",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${statusColors[status]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <div className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status]}`}>{statusText}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm">Current</span>
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  )
}
