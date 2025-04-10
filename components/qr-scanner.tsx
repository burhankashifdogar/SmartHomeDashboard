"use client"

import { useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QrScannerProps {
  onResult: (result: string) => void
  onError?: (error: Error) => void
  qrCodeSuccessCallback?: (decodedText: string) => void
  qrCodeErrorCallback?: (errorMessage: string) => void
}

export function QrScanner({ onResult, onError }: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const qrScannerId = "qr-scanner-container"
    const scannerContainer = document.createElement("div")
    scannerContainer.id = qrScannerId
    scannerContainer.style.width = "100%"
    scannerContainer.style.height = "100%"
    containerRef.current.appendChild(scannerContainer)

    let mounted = true

    const initScanner = async () => {
      try {
        scannerRef.current = new Html5Qrcode(qrScannerId)

        if (mounted) {
          try {
            await scannerRef.current.start(
              { facingMode: "environment" },
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                onResult(decodedText)
                if (scannerRef.current && scannerRef.current.isScanning) {
                  scannerRef.current.stop().catch(console.error)
                }
              },
              (errorMessage) => {
                // Just log the error but don't stop scanning
                console.log(errorMessage)
              },
            )
          } catch (startError) {
            // Handle camera access errors gracefully
            console.error("QR Scanner start error:", startError)
            if (onError && mounted) {
              onError(startError instanceof Error ? startError : new Error(String(startError)))
            }
          }
        }
      } catch (error) {
        console.error("QR Scanner initialization error:", error)
        if (onError && mounted && error instanceof Error) {
          onError(error)
        }
      }
    }

    initScanner()

    return () => {
      mounted = false

      // Proper cleanup
      if (scannerRef.current) {
        try {
          if (scannerRef.current.isScanning) {
            scannerRef.current.stop().catch((err) => {
              console.error("Error stopping scanner during cleanup:", err)
            })
          }
        } catch (e) {
          console.error("Error during scanner cleanup:", e)
        }
        scannerRef.current = null
      }

      // Remove the container
      if (containerRef.current && containerRef.current.contains(scannerContainer)) {
        try {
          containerRef.current.removeChild(scannerContainer)
        } catch (e) {
          console.error("Error removing scanner container:", e)
        }
      }
    }
  }, [onResult, onError])

  return <div ref={containerRef} className="w-full h-full" />
}
