'use client'

import React from 'react'
import { TopNav } from './top-nav'
import { InboxSidebar } from './inbox-sidebar'
import { ChatList } from './chat-list'
import { ChatWindow } from './chat-window'
import { DetailsPanel } from './details-panel'
import { currentUserData } from '@/lib/mock-data'
import { Chat } from '@/types'

interface DashboardContentProps {
  chats: Chat[]
  selectedChatId: string | null
  onSelectChat?: (chatId: string) => void
  interactive?: boolean
}

export function DashboardContent({
  chats,
  selectedChatId,
  onSelectChat,
  interactive = true,
}: DashboardContentProps) {
  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      <TopNav currentUser={currentUserData} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <InboxSidebar />
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={interactive && onSelectChat ? onSelectChat : () => {}}
        />
        <ChatWindow chat={selectedChat} />
        <DetailsPanel chat={selectedChat} />
      </div>
    </div>
  )
}
