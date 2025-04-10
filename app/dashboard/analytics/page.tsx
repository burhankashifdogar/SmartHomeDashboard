"use client";

import { useState } from "react";
import { Calendar, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { TemperatureChart } from "@/components/temperature-chart";
import { HumidityChart } from "@/components/humidity-chart";
import { EnergyUsageChart } from "@/components/energy-usage-chart";
import { DeviceUsageChart } from "@/components/device-usage-chart";

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("24h");

  const handleDownload = () => {
    toast({
      title: "Report downloaded",
      description: "The analytics report has been downloaded successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            {timeRange === "24h" && "Last 24 Hours"}
            {timeRange === "7d" && "Last 7 Days"}
            {timeRange === "30d" && "Last 30 Days"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25.4°C</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Humidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <p className="text-xs text-muted-foreground">
              +5.4% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Energy Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8 kWh</div>
            <p className="text-xs text-muted-foreground">
              -3.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6/8</div>
            <p className="text-xs text-muted-foreground">2 devices offline</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-4">
        {/* Temperature */}
        <Card>
          <CardHeader>
            <CardTitle>Temperature History</CardTitle>
            <CardDescription>
              Temperature readings across all rooms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Tabs defaultValue="24h" onValueChange={setTimeRange}>
                <TabsList className=" justify-center">
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <TemperatureChart />
          </CardContent>
        </Card>

        {/* Humidity */}
        <Card>
          <CardHeader>
            <CardTitle>Humidity History</CardTitle>
            <CardDescription>
              Humidity readings across all rooms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Tabs defaultValue="24h" onValueChange={setTimeRange}>
                <TabsList className=" justify-center">
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <HumidityChart />
          </CardContent>
        </Card>

        {/* Energy */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Usage</CardTitle>
            <CardDescription>Energy consumption by device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Tabs defaultValue="24h" onValueChange={setTimeRange}>
                <TabsList className=" justify-center">
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <EnergyUsageChart />
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Hours of operation per device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Tabs defaultValue="24h" onValueChange={setTimeRange}>
                <TabsList className=" justify-center">
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <DeviceUsageChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
