'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { Avatar } from './avatar'
import { Chat } from '@/types'

interface ChatListProps {
  chats: Chat[]
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  const [filterOpen, setFilterOpen] = useState('Open')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="w-80 bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Chat"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition flex items-center gap-1">
            <span>{filterOpen}</span>
            <ChevronDown size={16} />
          </button>
          <button className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition flex items-center gap-1">
            <span>Newest</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, idx) => (
          <motion.button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.05 }}
            className={`w-full p-3 text-left border-b border-gray-100 hover:bg-gray-50 transition ${
              selectedChatId === chat.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar initials={chat.user.initials} name={chat.user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{chat.user.name}</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
