"use client"

import { useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { useFadeIn } from "@/hooks/use-fade-in"

// ── Layout constants ──────────────────────────────────────────────────
const TRACK_HEIGHT = 520
const INNER_GAP = 16
const BLOCK_GAP = 24
const AUTO_SPEED = 1.5
const SCROLL_MULTIPLIER = 1.5
const MAX_OFFSET = 80
const TOTAL_HEIGHT = TRACK_HEIGHT + MAX_OFFSET

type GalleryBlock = {
  width: number
  offsetY: number
  items: { src: string; alt: string; height: number }[]
}

// Asymmetric block pattern with y offsets for an organic, editorial look
const blocks: GalleryBlock[] = [
  // 1 — tall
  {
    width: 350,
    offsetY: 0,
    items: [{ src: "/_DSC0878.jpg", alt: "Pilates Studio", height: TRACK_HEIGHT }],
  },
  // 2 — stacked, top heavy
  {
    width: 340,
    offsetY: 60,
    items: [
      { src: "/_DSC0885.jpg", alt: "Pilates Training", height: 300 },
      { src: "/_DSC0919.jpg", alt: "Pilates Übung", height: TRACK_HEIGHT - 300 - INNER_GAP },
    ],
  },
  // 3 — wide
  {
    width: 540,
    offsetY: 15,
    items: [{ src: "/_DSC0924.jpg", alt: "Studio Atmosphäre", height: TRACK_HEIGHT - 30 }],
  },
  // 4 — stacked, bottom heavy
  {
    width: 300,
    offsetY: 0,
    items: [
      { src: "/_DSC0925.jpg", alt: "Reformer Detail", height: 200 },
      { src: "/_DSC0954-3.jpg", alt: "Pilates Pose", height: TRACK_HEIGHT - 200 - INNER_GAP },
    ],
  },
  // 5 — medium
  {
    width: 420,
    offsetY: 70,
    items: [{ src: "/_DSC0966-4.jpg", alt: "Training Session", height: TRACK_HEIGHT - 70 }],
  },
  // 6 — stacked, even
  {
    width: 320,
    offsetY: 25,
    items: [
      { src: "/_DSC0993.jpg", alt: "Pilates Bewegung", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: "/_DSC1024.jpg", alt: "Körperarbeit", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  // 7 — wide
  {
    width: 520,
    offsetY: 0,
    items: [{ src: "/_DSC1033-3.jpg", alt: "Studio Einblick", height: TRACK_HEIGHT }],
  },
  // 8 — stacked, top heavy
  {
    width: 330,
    offsetY: 50,
    items: [
      { src: "/_DSC1036.jpg", alt: "Pilates Kraft", height: 280 },
      { src: "/_DSC1052.jpg", alt: "Dehnung", height: TRACK_HEIGHT - 280 - INNER_GAP },
    ],
  },
  // 9 — tall narrow
  {
    width: 300,
    offsetY: 20,
    items: [{ src: "/_DSC1142-3.jpg", alt: "Balance Training", height: TRACK_HEIGHT - 20 }],
  },
  // 10 — stacked, bottom heavy
  {
    width: 350,
    offsetY: 0,
    items: [
      { src: "/_DSC1196.jpg", alt: "Pilates Flow", height: 210 },
      { src: "/_DSC1208.jpg", alt: "Konzentration", height: TRACK_HEIGHT - 210 - INNER_GAP },
    ],
  },
  // 11 — wide
  {
    width: 560,
    offsetY: 80,
    items: [{ src: "/_DSC1234.jpg", alt: "Reformer Training", height: TRACK_HEIGHT - 80 }],
  },
  // 12 — stacked, even
  {
    width: 310,
    offsetY: 35,
    items: [
      { src: "/_DSC1238.jpg", alt: "Pilates Technik", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: "/_DSC1254.jpg", alt: "Beweglichkeit", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  // 13 — medium
  {
    width: 440,
    offsetY: 0,
    items: [{ src: "/_DSC1303.jpg", alt: "Pilates Stunde", height: TRACK_HEIGHT }],
  },
  // 14 — stacked, top heavy
  {
    width: 340,
    offsetY: 45,
    items: [
      { src: "/_DSC1443-3.jpg", alt: "Ganzkörper Training", height: 310 },
      { src: "/_DSC1520.jpg", alt: "Pilates Haltung", height: TRACK_HEIGHT - 310 - INNER_GAP },
    ],
  },
  // 15 — tall
  {
    width: 360,
    offsetY: 10,
    items: [{ src: "/_DSC1550.jpg", alt: "Pilates Moment", height: TRACK_HEIGHT - 10 }],
  },
  // 16 — stacked, bottom heavy
  {
    width: 300,
    offsetY: 60,
    items: [
      { src: "/_DSC1581.jpg", alt: "Training Detail", height: 190 },
      { src: "/_DSC1640.jpg", alt: "Pilates Ausdruck", height: TRACK_HEIGHT - 190 - INNER_GAP },
    ],
  },
  // 17 — wide
  {
    width: 530,
    offsetY: 0,
    items: [{ src: "/_DSC1646.jpg", alt: "Pilates Raum", height: TRACK_HEIGHT }],
  },
  // 18 — stacked, even
  {
    width: 320,
    offsetY: 40,
    items: [
      { src: "/_DSC1661.jpg", alt: "Pilates Kurs", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: "/_DSC1683.jpg", alt: "Gruppentraining", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  // 19 — medium
  {
    width: 450,
    offsetY: 75,
    items: [{ src: "/_DSC1684.jpg", alt: "Pilates Fokus", height: TRACK_HEIGHT - 75 }],
  },
  // 20 — stacked, top heavy
  {
    width: 330,
    offsetY: 0,
    items: [
      { src: "/_DSC1697.jpg", alt: "Reformer Übung", height: 290 },
      { src: "/_DSC1701.jpg", alt: "Matten Training", height: TRACK_HEIGHT - 290 - INNER_GAP },
    ],
  },
  // 21 — tall
  {
    width: 340,
    offsetY: 30,
    items: [{ src: "/_DSC1712.jpg", alt: "Pilates Eleganz", height: TRACK_HEIGHT - 30 }],
  },
  // 22 — stacked, bottom heavy
  {
    width: 310,
    offsetY: 55,
    items: [
      { src: "/_DSC1720.jpg", alt: "Kraft und Balance", height: 205 },
      { src: "/_DSC1749.jpg", alt: "Pilates Bewegung", height: TRACK_HEIGHT - 205 - INNER_GAP },
    ],
  },
  // 23 — wide
  {
    width: 550,
    offsetY: 0,
    items: [{ src: "/_DSC1797-2.jpg", alt: "Studio Panorama", height: TRACK_HEIGHT }],
  },
  // 24 — stacked, even
  {
    width: 320,
    offsetY: 65,
    items: [
      { src: "/_DSC1829.jpg", alt: "Pilates Praxis", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: "/_DSC1846.jpg", alt: "Training Einblick", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  // 25 — medium
  {
    width: 460,
    offsetY: 20,
    items: [{ src: "/_DSC1874.jpg", alt: "Pilates Energie", height: TRACK_HEIGHT - 20 }],
  },
  // 26 — stacked, top heavy
  {
    width: 340,
    offsetY: 0,
    items: [
      { src: "/IntroPicture.JPG", alt: "Pilates Studio", height: 300 },
      { src: "/hands.JPG", alt: "Hände beim Training", height: TRACK_HEIGHT - 300 - INNER_GAP },
    ],
  },
  // 27 — tall
  {
    width: 380,
    offsetY: 50,
    items: [{ src: "/oldMan.JPG", alt: "Training für jedes Alter", height: TRACK_HEIGHT - 50 }],
  },
  // 28 — stacked, bottom heavy
  {
    width: 300,
    offsetY: 10,
    items: [
      { src: "/youngWoman.JPG", alt: "Junge Frau beim Pilates", height: 215 },
      { src: "/yogamatte.jpg", alt: "Matten Pilates", height: TRACK_HEIGHT - 215 - INNER_GAP },
    ],
  },
  // 29 — wide
  {
    width: 500,
    offsetY: 35,
    items: [{ src: "/refomrer.jpg.webp", alt: "Reformer Gerät", height: TRACK_HEIGHT - 35 }],
  },
]

const setWidth = blocks.reduce((sum, b) => sum + b.width + BLOCK_GAP, 0)

// ── Sub-components ────────────────────────────────────────────────────

function GalleryImage({ src, alt, height }: { src: string; alt: string; height: number }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden group"
      style={{ height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="560px"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

function BlockColumn({ block, keyPrefix }: { block: GalleryBlock; keyPrefix: string }) {
  return (
    <div
      className="shrink-0 flex flex-col"
      style={{
        width: block.width,
        height: TOTAL_HEIGHT,
        paddingTop: block.offsetY,
        gap: INNER_GAP,
      }}
    >
      {block.items.map((item, i) => (
        <GalleryImage key={`${keyPrefix}-${i}`} {...item} />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────

export function Gallery() {
  const { ref: sectionRef, isVisible } = useFadeIn()
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragOffsetRef = useRef(0)

  const wrapOffset = useCallback(
    (val: number) => ((val % setWidth) + setWidth) % setWidth,
    []
  )

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
    }
  }, [])

  // Auto-scroll loop
  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        offsetRef.current = wrapOffset(offsetRef.current + AUTO_SPEED)
        applyTransform()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [wrapOffset, applyTransform])

  // Horizontal scroll only
  useEffect(() => {
    const container = trackRef.current?.parentElement
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      offsetRef.current = wrapOffset(offsetRef.current + e.deltaX * SCROLL_MULTIPLIER)
      applyTransform()
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [wrapOffset, applyTransform])

  // Pointer drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragOffsetRef.current = offsetRef.current
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const dx = dragStartXRef.current - e.clientX
    offsetRef.current = wrapOffset(dragOffsetRef.current + dx)
    applyTransform()
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div
        className={`overflow-hidden transition-all duration-700 select-none ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: isVisible ? "200ms" : "0ms", cursor: "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex items-start will-change-transform"
          style={{ gap: BLOCK_GAP, width: setWidth * 2 }}
        >
          {blocks.map((block, i) => (
            <BlockColumn key={`a-${i}`} block={block} keyPrefix={`a-${i}`} />
          ))}
          {blocks.map((block, i) => (
            <BlockColumn key={`b-${i}`} block={block} keyPrefix={`b-${i}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
