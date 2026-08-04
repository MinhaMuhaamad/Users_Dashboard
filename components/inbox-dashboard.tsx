'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from './sidebar'
import { ChatList } from './chat-list'
import { ChatWindow } from './chat-window'
import { DetailsPanel } from './details-panel'
import { LoadingOverlay } from './loading-overlay'
import { currentUserData } from '@/lib/mock-data'
import { useChatsWithApi } from '@/hooks/useChatsWithApi'

export function InboxDashboard() {
  const { chats, isLoading, hasLoaded } = useChatsWithApi()
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  // Set default selected chat once data loads
  useEffect(() => {
    if (hasLoaded && !selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0]?.id || null)
    }
  }, [hasLoaded, chats, selectedChatId])

  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex h-screen w-full bg-white overflow-hidden"
        >
          {/* Sidebar */}
          <Sidebar currentUser={currentUserData} />

          {/* Chat List */}
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
          />

          {/* Chat Window */}
          <ChatWindow chat={selectedChat} />

          {/* Details Panel */}
          <DetailsPanel chat={selectedChat} />
        </motion.div>
      )}
    </>
  )
}
