'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardContent } from './dashboard-content'
import { LoadingOverlay } from './loading-overlay'
import { useChatsWithApi } from '@/hooks/useChatsWithApi'

export function InboxDashboard() {
  const { chats, isLoading } = useChatsWithApi()
  const [selectedChatId, setSelectedChatId] = useState<string | null>('1')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0]?.id || null)
    }
  }, [chats, selectedChatId])

  return (
    <>
      <AnimatePresence>
        {!isExpanded && (
          <LoadingOverlay
            isVisible
            isLoading={isLoading}
            chats={chats}
            selectedChatId={selectedChatId}
            onExpand={() => setIsExpanded(true)}
          />
        )}
      </AnimatePresence>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: '40vh', scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
