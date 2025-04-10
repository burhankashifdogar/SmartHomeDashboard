"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Droplets,
  Fan,
  Lightbulb,
  Thermometer,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DeviceCard } from "@/components/device-card";
import { SensorCard } from "@/components/sensor-card";
import { TemperatureChart } from "@/components/temperature-chart";
import { HumidityChart } from "@/components/humidity-chart";
import { EnergyUsageChart } from "@/components/energy-usage-chart";

export default function DashboardPage() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<{ id: number; message: string }[]>([]);

  // Simulate receiving alerts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts([
        { id: 1, message: "Living Room temperature is above threshold (28°C)" },
      ]);

      toast({
        title: "Temperature Alert",
        description: "Living Room temperature is above threshold",
        variant: "destructive",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Alert</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                {alert.message}
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-xs underline"
                >
                  Dismiss
                </button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DeviceCard
          icon={Lightbulb}
          title="Living Room Lights"
          initialState={true}
          onToggle={(state) => {
            toast({
              title: `Living Room Lights ${state ? "On" : "Off"}`,
              description: `The lights have been turned ${
                state ? "on" : "off"
              }`,
            });
          }}
        />

        <DeviceCard
          icon={Lightbulb}
          title="Kitchen Lights"
          initialState={false}
          onToggle={(state) => {
            toast({
              title: `Kitchen Lights ${state ? "On" : "Off"}`,
              description: `The lights have been turned ${
                state ? "on" : "off"
              }`,
            });
          }}
        />

        <DeviceCard
          icon={Fan}
          title="Living Room Fan"
          initialState={true}
          onToggle={(state) => {
            toast({
              title: `Living Room Fan ${state ? "On" : "Off"}`,
              description: `The fan has been turned ${state ? "on" : "off"}`,
            });
          }}
        />

        <DeviceCard
          icon={Fan}
          title="Bedroom Fan"
          initialState={false}
          onToggle={(state) => {
            toast({
              title: `Bedroom Fan ${state ? "On" : "Off"}`,
              description: `The fan has been turned ${state ? "on" : "off"}`,
            });
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SensorCard
          icon={Thermometer}
          title="Living Room"
          value="28°C"
          status="critical"
          statusText="Above threshold"
        />

        <SensorCard
          icon={Thermometer}
          title="Bedroom"
          value="24°C"
          status="normal"
          statusText="Normal"
        />

        <SensorCard
          icon={Droplets}
          title="Living Room"
          value="65%"
          status="warning"
          statusText="High humidity"
        />

        <SensorCard
          icon={Droplets}
          title="Bedroom"
          value="45%"
          status="normal"
          statusText="Normal"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Temperature Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Temperature History</CardTitle>
            <CardDescription>
              24-hour temperature readings across all rooms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TemperatureChart />
          </CardContent>
        </Card>

        {/* Humidity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Humidity History</CardTitle>
            <CardDescription>
              24-hour humidity readings across all rooms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HumidityChart />
          </CardContent>
        </Card>

        {/* Energy Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Usage</CardTitle>
            <CardDescription>
              Daily energy consumption by device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnergyUsageChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
