'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardContent } from './dashboard-content'
import { LoadingOverlay } from './loading-overlay'
import { useChatsWithApi } from '@/hooks/useChatsWithApi'

export function InboxDashboard() {
  const { chats, isLoading } = useChatsWithApi()
  const [selectedChatId, setSelectedChatId] = useState<string | null>('1')
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandProgress, setExpandProgress] = useState(0)

  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0]?.id || null)
    }
  }, [chats, selectedChatId])

  const handleExpand = useCallback(() => {
    setExpandProgress(1)
    setIsExpanded(true)
  }, [])

  useEffect(() => {
    if (isExpanded) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return
      e.preventDefault()
      setExpandProgress((prev) => {
        const next = Math.min(1, prev + e.deltaY * 0.0025)
        if (next >= 0.98) {
          setIsExpanded(true)
        }
        return next
      })
    }

    const handleTouchStart = (() => {
      let startY = 0
      return {
        start: (e: TouchEvent) => {
          startY = e.touches[0]?.clientY ?? 0
        },
        move: (e: TouchEvent) => {
          const currentY = e.touches[0]?.clientY ?? 0
          const delta = startY - currentY
          if (delta > 0) {
            setExpandProgress((prev) => {
              const next = Math.min(1, prev + delta * 0.005)
              if (next >= 0.98) setIsExpanded(true)
              return next
            })
            startY = currentY
          }
        },
      }
    })()

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart.start, { passive: true })
    window.addEventListener('touchmove', handleTouchStart.move, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart.start)
      window.removeEventListener('touchmove', handleTouchStart.move)
    }
  }, [isExpanded])

  return (
    <>
      <AnimatePresence>
        {!isExpanded && (
          <LoadingOverlay
            isVisible
            chats={chats}
            selectedChatId={selectedChatId}
            expandProgress={expandProgress}
            onExpand={handleExpand}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: `${42}vh` }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-white"
        >
          <DashboardContent
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            interactive
          />
        </motion.div>
      )}
    </>
  )
}
