"use client"

import { useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { useFadeIn } from "@/hooks/use-fade-in"
import { img } from "@/lib/utils"

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
const GP = "/GalleryPictures"

const blocks: GalleryBlock[] = [
  {
    width: 360,
    offsetY: 0,
    items: [{ src: `${GP}/IMG_7914.JPG`, alt: "Pilates Studio", height: TRACK_HEIGHT }],
  },
  {
    width: 330,
    offsetY: 55,
    items: [
      { src: `${GP}/IMG_7942b.JPG`, alt: "Pilates Training", height: 290 },
      { src: `${GP}/IMG_7965b.JPG`, alt: "Pilates Übung", height: TRACK_HEIGHT - 290 - INNER_GAP },
    ],
  },
  {
    width: 520,
    offsetY: 15,
    items: [{ src: `${GP}/IMG_7966.JPG`, alt: "Studio Atmosphäre", height: TRACK_HEIGHT - 30 }],
  },
  {
    width: 310,
    offsetY: 0,
    items: [
      { src: `${GP}/IMG_7989.JPG`, alt: "Reformer Detail", height: 210 },
      { src: `${GP}/IMG_8010.JPG`, alt: "Pilates Pose", height: TRACK_HEIGHT - 210 - INNER_GAP },
    ],
  },
  {
    width: 440,
    offsetY: 70,
    items: [{ src: `${GP}/IMG_8074.JPG`, alt: "Training Session", height: TRACK_HEIGHT - 70 }],
  },
  {
    width: 320,
    offsetY: 25,
    items: [
      { src: `${GP}/_DSC0847.jpg`, alt: "Pilates Bewegung", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: `${GP}/_DSC0878.jpg`, alt: "Körperarbeit", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  {
    width: 540,
    offsetY: 0,
    items: [{ src: `${GP}/_DSC0885.jpg`, alt: "Studio Einblick", height: TRACK_HEIGHT }],
  },
  {
    width: 340,
    offsetY: 50,
    items: [
      { src: `${GP}/_DSC0919.jpg`, alt: "Pilates Kraft", height: 280 },
      { src: `${GP}/_DSC0966-4.jpg`, alt: "Dehnung", height: TRACK_HEIGHT - 280 - INNER_GAP },
    ],
  },
  {
    width: 300,
    offsetY: 20,
    items: [{ src: `${GP}/_DSC0997.jpg`, alt: "Balance Training", height: TRACK_HEIGHT - 20 }],
  },
  {
    width: 350,
    offsetY: 0,
    items: [
      { src: `${GP}/_DSC1024.jpg`, alt: "Pilates Flow", height: 220 },
      { src: `${GP}/_DSC1054.jpg`, alt: "Konzentration", height: TRACK_HEIGHT - 220 - INNER_GAP },
    ],
  },
  {
    width: 550,
    offsetY: 80,
    items: [{ src: `${GP}/_DSC1067.jpg`, alt: "Reformer Training", height: TRACK_HEIGHT - 80 }],
  },
  {
    width: 310,
    offsetY: 35,
    items: [
      { src: `${GP}/_DSC1095.jpg`, alt: "Pilates Technik", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: `${GP}/_DSC1142-3.jpg`, alt: "Beweglichkeit", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  {
    width: 450,
    offsetY: 0,
    items: [{ src: `${GP}/_DSC1196.jpg`, alt: "Pilates Stunde", height: TRACK_HEIGHT }],
  },
  {
    width: 330,
    offsetY: 45,
    items: [
      { src: `${GP}/_DSC1234.jpg`, alt: "Ganzkörper Training", height: 300 },
      { src: `${GP}/_DSC1298.jpg`, alt: "Pilates Haltung", height: TRACK_HEIGHT - 300 - INNER_GAP },
    ],
  },
  {
    width: 370,
    offsetY: 10,
    items: [{ src: `${GP}/_DSC1341.jpg`, alt: "Pilates Moment", height: TRACK_HEIGHT - 10 }],
  },
  {
    width: 300,
    offsetY: 60,
    items: [
      { src: `${GP}/_DSC1575.jpg`, alt: "Training Detail", height: 195 },
      { src: `${GP}/_DSC1585.jpg`, alt: "Pilates Ausdruck", height: TRACK_HEIGHT - 195 - INNER_GAP },
    ],
  },
  {
    width: 530,
    offsetY: 0,
    items: [{ src: `${GP}/_DSC1633.jpg`, alt: "Pilates Raum", height: TRACK_HEIGHT }],
  },
  {
    width: 320,
    offsetY: 40,
    items: [
      { src: `${GP}/_DSC1646.jpg`, alt: "Pilates Kurs", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
      { src: `${GP}/_DSC1661.jpg`, alt: "Gruppentraining", height: (TRACK_HEIGHT - INNER_GAP) / 2 },
    ],
  },
  {
    width: 460,
    offsetY: 75,
    items: [{ src: `${GP}/_DSC1684.jpg`, alt: "Pilates Fokus", height: TRACK_HEIGHT - 75 }],
  },
  {
    width: 340,
    offsetY: 0,
    items: [
      { src: `${GP}/_DSC1697.jpg`, alt: "Reformer Übung", height: 285 },
      { src: `${GP}/_DSC1701.jpg`, alt: "Matten Training", height: TRACK_HEIGHT - 285 - INNER_GAP },
    ],
  },
  {
    width: 350,
    offsetY: 30,
    items: [{ src: `${GP}/_DSC1712.jpg`, alt: "Pilates Eleganz", height: TRACK_HEIGHT - 30 }],
  },
  {
    width: 500,
    offsetY: 0,
    items: [{ src: `${GP}/_DSC1728.jpg`, alt: "Studio Panorama", height: TRACK_HEIGHT }],
  },
  {
    width: 380,
    offsetY: 65,
    items: [{ src: `${GP}/_DSC1739.jpg`, alt: "Pilates Energie", height: TRACK_HEIGHT - 65 }],
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
        src={img(src)}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
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
  const velocityRef = useRef(0)
  const lastMoveXRef = useRef(0)
  const lastMoveTimeRef = useRef(0)

  const wrapOffset = useCallback(
    (val: number) => ((val % setWidth) + setWidth) % setWidth,
    []
  )

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.5) {
          offsetRef.current = wrapOffset(offsetRef.current + velocityRef.current)
          velocityRef.current *= 0.95
        } else {
          velocityRef.current = 0
          offsetRef.current = wrapOffset(offsetRef.current + AUTO_SPEED)
        }
        applyTransform()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [wrapOffset, applyTransform])

  useEffect(() => {
    const container = trackRef.current?.parentElement
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      velocityRef.current = 0
      offsetRef.current = wrapOffset(offsetRef.current + e.deltaX * SCROLL_MULTIPLIER)
      applyTransform()
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [wrapOffset, applyTransform])

  useEffect(() => {
    const container = trackRef.current?.parentElement
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true
      velocityRef.current = 0
      dragStartXRef.current = e.touches[0].clientX
      lastMoveXRef.current = e.touches[0].clientX
      lastMoveTimeRef.current = Date.now()
      dragOffsetRef.current = offsetRef.current
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()
      const x = e.touches[0].clientX
      const now = Date.now()
      const dt = now - lastMoveTimeRef.current
      if (dt > 0) {
        velocityRef.current = (lastMoveXRef.current - x) / dt * 16
      }
      lastMoveXRef.current = x
      lastMoveTimeRef.current = now
      const dx = dragStartXRef.current - x
      offsetRef.current = wrapOffset(dragOffsetRef.current + dx)
      applyTransform()
    }

    const handleTouchEnd = () => {
      isDraggingRef.current = false
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [wrapOffset, applyTransform])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return
    isDraggingRef.current = true
    velocityRef.current = 0
    dragStartXRef.current = e.clientX
    lastMoveXRef.current = e.clientX
    lastMoveTimeRef.current = Date.now()
    dragOffsetRef.current = offsetRef.current
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || e.pointerType === "touch") return
    const now = Date.now()
    const dt = now - lastMoveTimeRef.current
    if (dt > 0) {
      velocityRef.current = (lastMoveXRef.current - e.clientX) / dt * 16
    }
    lastMoveXRef.current = e.clientX
    lastMoveTimeRef.current = now
    const dx = dragStartXRef.current - e.clientX
    offsetRef.current = wrapOffset(dragOffsetRef.current + dx)
    applyTransform()
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return
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
        style={{ transitionDelay: isVisible ? "200ms" : "0ms", cursor: "grab", touchAction: "pan-y" }}
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
