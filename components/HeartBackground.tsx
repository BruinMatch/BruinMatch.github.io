"use client"

import { useEffect, useState } from "react"

const HEART_COLORS = [
  "#FF69B4", // Hot Pink
  "#FF1493", // Deep Pink
  "#C71585", // Medium Violet Red
  "#DB7093", // Pale Violet Red
  "#FFC0CB", // Pink
  "#FFB6C1", // Light Pink
  "#FF69B4", // Hot Pink
  "#FF5F5F", // Indian Red
]

interface HeartProps {
  size: number
  color: string
  left: number
  top: number
  animationDuration: number
}

function Heart({ size, color, left, top, animationDuration }: HeartProps) {
  return (
    <svg
      className="absolute animate-float"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${animationDuration}s`,
        color: color,
      }}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export default function HeartBackground() {
  const [hearts, setHearts] = useState<HeartProps[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 50 }, () => ({
      size: Math.random() * 40 + 10, // Sizes from 10 to 50
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10, // 10 to 25 seconds
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart, index) => (
        <Heart key={index} {...heart} />
      ))}
    </div>
  )
}

