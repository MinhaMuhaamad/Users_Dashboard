'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { DashboardContent } from './dashboard-content'
import { Chat } from '@/types'

const DASHBOARD_WIDTH = 1280
const DASHBOARD_HEIGHT = 680

interface ScaledDashboardPreviewProps {
  chats: Chat[]
  selectedChatId: string | null
}

export function ScaledDashboardPreview({ chats, selectedChatId }: ScaledDashboardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  const updateScale = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const scaleX = width / DASHBOARD_WIDTH
    const scaleY = height / DASHBOARD_HEIGHT
    setScale(Math.min(scaleX, scaleY))
  }, [])

  useEffect(() => {
    updateScale()
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateScale])

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden relative bg-white">
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          width: DASHBOARD_WIDTH,
          height: DASHBOARD_HEIGHT,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <DashboardContent
          chats={chats}
          selectedChatId={selectedChatId}
          interactive={false}
        />
      </div>
    </div>
  )
}

interface DashboardSkeletonProps {
  className?: string
}

export function DashboardSkeleton({ className = '' }: DashboardSkeletonProps) {
  return (
    <div className={`flex h-full w-full ${className}`}>
      <div className="w-[14%] bg-gray-50 border-r border-gray-200 p-2 flex flex-col gap-2 shrink-0">
        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-300 rounded w-full animate-pulse" />
        <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse" />
        <div className="h-3 bg-gray-300 rounded w-4/5 animate-pulse" />
        <div className="h-3 bg-gray-300 rounded w-full animate-pulse mt-2" />
        <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse" />
      </div>

      <div className="w-[20%] bg-white border-r border-gray-200 p-2 flex flex-col gap-2 shrink-0">
        <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse mb-1" />
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-1.5 items-start">
            <div className="w-6 h-6 bg-gray-300 rounded-full shrink-0 animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="h-2.5 bg-gray-300 rounded w-3/4 animate-pulse" />
              <div className="h-2 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 p-3 border-r border-gray-200 flex flex-col gap-2 min-w-0">
        <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse" />
        <div className="flex-1 space-y-2 mt-1">
          <div className="h-2.5 bg-gray-200 rounded w-3/5 animate-pulse" />
          <div className="h-2.5 bg-gray-200 rounded w-2/5 animate-pulse ml-auto" />
          <div className="h-2.5 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-2.5 bg-gray-200 rounded w-2/5 animate-pulse ml-auto" />
        </div>
        <div className="h-6 bg-gray-200 rounded animate-pulse mt-auto" />
      </div>

      <div className="w-[16%] bg-gray-50 border-l border-gray-200 p-2 flex flex-col gap-2 shrink-0">
        <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse" />
        <div className="h-2.5 bg-gray-200 rounded animate-pulse" />
        <div className="h-2.5 bg-gray-200 rounded w-5/6 animate-pulse" />
        <div className="h-2.5 bg-gray-200 rounded w-4/5 animate-pulse" />
        <div className="h-2.5 bg-gray-200 rounded animate-pulse mt-2" />
        <div className="h-2.5 bg-gray-200 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  )
}
