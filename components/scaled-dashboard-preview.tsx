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

export function ScaledDashboardSkeleton() {
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
        <DashboardSkeleton />
      </div>
    </div>
  )
}

interface DashboardSkeletonProps {
  className?: string
}

export function DashboardSkeleton({ className = '' }: DashboardSkeletonProps) {
  return (
    <div className={`flex flex-col h-full w-full bg-white overflow-hidden animate-pulse ${className}`}>
      {/* TopNav Skeleton */}
      <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-8">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="flex gap-4">
            <div className="h-4 w-12 bg-gray-150 rounded" />
            <div className="h-4 w-16 bg-gray-150 rounded" />
            <div className="h-4 w-20 bg-gray-150 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gray-150" />
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Inbox Sidebar Skeleton */}
        <div className="w-48 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 shrink-0">
          <div className="h-5 w-16 bg-gray-300 rounded" />
          <div className="space-y-3 mt-2">
            <div className="h-8 bg-gray-100 rounded-md w-full" />
            <div className="h-8 bg-gray-50 rounded-md w-full" />
            <div className="h-8 bg-gray-50 rounded-md w-full" />
          </div>
          <div className="h-3 w-12 bg-gray-200 rounded mt-4" />
          <div className="space-y-2 mt-1">
            <div className="h-7 bg-gray-50 rounded-md w-full" />
            <div className="h-7 bg-gray-50 rounded-md w-full" />
          </div>
        </div>

        {/* Chat List Column Skeleton */}
        <div className="w-72 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 shrink-0">
          <div className="h-4 w-28 bg-gray-300 rounded" />
          <div className="h-8 bg-gray-100 rounded-lg w-full" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-50 rounded flex-1" />
            <div className="h-6 bg-gray-50 rounded flex-1" />
          </div>
          <div className="space-y-4 mt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                    <div className="h-2 bg-gray-200 rounded w-8" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window Skeleton */}
        <div className="flex-1 bg-white border-r border-gray-200 flex flex-col min-w-0">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded bg-gray-50" />
              <div className="w-8 h-8 rounded bg-gray-50" />
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div className="h-3 bg-gray-100 rounded w-24 mx-auto mb-6" />
            <div className="flex gap-3 items-start max-w-lg">
              <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
              <div className="bg-gray-100 rounded-2xl p-4 w-full space-y-2">
                <div className="h-2.5 bg-gray-300 rounded w-full" />
                <div className="h-2.5 bg-gray-300 rounded w-5/6" />
              </div>
            </div>
            <div className="flex gap-3 items-start max-w-lg ml-auto justify-end">
              <div className="bg-blue-50 rounded-2xl p-4 w-full max-w-md space-y-2">
                <div className="h-2.5 bg-blue-200/50 rounded w-full" />
                <div className="h-2.5 bg-blue-200/50 rounded w-4/5" />
              </div>
              <div className="w-8 h-8 bg-blue-200 rounded-full shrink-0" />
            </div>
          </div>
          {/* Input Box */}
          <div className="p-4 border-t border-gray-200 shrink-0">
            <div className="h-16 bg-gray-50 rounded-xl w-full" />
          </div>
        </div>

        {/* Details Panel Skeleton */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 flex flex-col gap-4 shrink-0">
          <div className="h-4 w-16 bg-gray-300 rounded mb-2" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 pb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="h-3 bg-gray-300 rounded w-20" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
              </div>
              <div className="h-2 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
