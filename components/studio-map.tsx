"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const ADDRESS = "Am Tannenhof 38, Konstanz, Germany"
const ZOOM = 16

export function StudioMap({ className }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const container = mapRef.current
    if (!container) return

    let cancelled = false
    let map: L.Map | null = null

    async function initMap() {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ADDRESS)}&limit=1`
      )
      const data = await res.json()

      if (cancelled || !data.length) return

      const lat = parseFloat(data[0].lat)
      const lon = parseFloat(data[0].lon)

      map = L.map(container as HTMLElement, {
        center: [lat, lon],
        zoom: ZOOM,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map)

      const icon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="oklch(0.15 0 0)" width="36" height="36"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      })

      L.marker([lat, lon], { icon }).addTo(map)
      setLoading(false)
    }

    initMap()

    return () => {
      cancelled = true
      if (map) {
        map.remove()
        map = null
      }
    }
  }, [])

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block cursor-pointer ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full pointer-events-none" />
    </a>
  )
}
