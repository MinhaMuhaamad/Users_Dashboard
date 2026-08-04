'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoreVertical, Moon, Copy, Bold, Italic, Link, Smile, Paperclip, Send } from 'lucide-react'
import { Avatar } from './avatar'
import { MessageBubble } from './message-bubble'
import { Chat } from '@/types'

interface ChatWindowProps {
  chat: Chat | null
}

export function ChatWindow({ chat }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.id])

  if (!chat) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 bg-white flex items-center justify-center"
      >
        <p className="text-gray-500">Select a chat to start messaging</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex-1 bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={chat.user.initials} name={chat.user.name} size="md" />
          <div>
            <h2 className="font-semibold text-gray-900">{chat.user.name}</h2>
            <p className="text-xs text-gray-500">28 August 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <Moon size={20} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <Copy size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.messages.map((message, idx) => (
          <MessageBubble key={message.id} message={message} index={idx} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <Bold size={16} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <Italic size={16} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <Link size={16} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <Smile size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Input Field */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type something...."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <Paperclip size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <Send size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
