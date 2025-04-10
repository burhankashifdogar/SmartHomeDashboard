"use client"

import type React from "react"

import { useState } from "react"
import { Camera, QrCode, Scan, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { QrScanner } from "@/components/qr-scanner"

export default function AddDevicePage() {
  const { toast } = useToast()
  const [deviceId, setDeviceId] = useState("")
  const [deviceCode, setDeviceCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate device registration
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Device added successfully",
        description: `Device ${deviceId} has been added to your smart home.`,
      })
      setDeviceId("")
      setDeviceCode("")
    }, 1500)
  }

  const handleQrCodeResult = (result: string) => {
    setIsScanning(false)

    try {
      // Assuming QR code contains JSON with deviceId and deviceCode
      const deviceData = JSON.parse(result)

      if (deviceData.deviceId && deviceData.deviceCode) {
        setDeviceId(deviceData.deviceId)
        setDeviceCode(deviceData.deviceCode)

        toast({
          title: "QR Code scanned",
          description: `Device ID: ${deviceData.deviceId} detected. You can now add this device.`,
        })
      } else {
        throw new Error("Invalid QR code format")
      }
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "The scanned QR code doesn't contain valid device information.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Add New Device</h1>
      </div>

      <Tabs defaultValue="manual" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">
            <Smartphone className="mr-2 h-4 w-4" />
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="qrcode">
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Add Device Manually</CardTitle>
              <CardDescription>
                Enter the device ID and pairing code found on your device or its packaging.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleManualAdd}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceId">Device ID</Label>
                  <Input
                    id="deviceId"
                    placeholder="e.g. SH-LIGHT-12345"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceCode">Pairing Code</Label>
                  <Input
                    id="deviceCode"
                    placeholder="e.g. ABC123"
                    value={deviceCode}
                    onChange={(e) => setDeviceCode(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Adding Device..." : "Add Device"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="qrcode">
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Scan the QR code on your device or its packaging to add it automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {isScanning ? (
                <div className="w-full max-w-md aspect-square relative overflow-hidden rounded-lg border">
                  <QrScanner
                    onResult={handleQrCodeResult}
                    onError={(error) => {
                      console.error("QR Scanner error:", error.message)
                      toast({
                        title: "Camera Error",
                        description: "There was an error accessing your camera. Please check camera permissions.",
                        variant: "destructive",
                      })
                      setIsScanning(false)
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="mb-4 text-muted-foreground">Camera access is required to scan QR codes</p>
                  <Button
                    onClick={() => {
                      try {
                        setIsScanning(true)
                      } catch (error) {
                        console.error("Failed to start scanning:", error)
                        toast({
                          title: "Error",
                          description: "Failed to start camera scanning.",
                          variant: "destructive",
                        })
                      }
                    }}
                    className="gap-2"
                  >
                    <Scan className="h-4 w-4" />
                    Start Scanning
                  </Button>
                </div>
              )}

              {isScanning && (
                <Button variant="outline" onClick={() => setIsScanning(false)} className="mt-4">
                  Cancel Scanning
                </Button>
              )}

              {deviceId && deviceCode && (
                <div className="w-full mt-6 p-4 border rounded-lg bg-muted/50">
                  <p className="font-medium">Device detected:</p>
                  <p className="text-sm text-muted-foreground">ID: {deviceId}</p>
                  <p className="text-sm text-muted-foreground">Code: {deviceCode}</p>
                  <Button className="w-full mt-4" onClick={handleManualAdd} disabled={isLoading}>
                    {isLoading ? "Adding Device..." : "Add This Device"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Compatible Devices</CardTitle>
            <CardDescription>The following device types are compatible with your Smart Home system:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Smart Lights</p>
                  <p className="text-sm text-muted-foreground">SH-LIGHT series</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Smart Plugs</p>
                  <p className="text-sm text-muted-foreground">SH-PLUG series</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Temperature Sensors</p>
                  <p className="text-sm text-muted-foreground">SH-TEMP series</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
