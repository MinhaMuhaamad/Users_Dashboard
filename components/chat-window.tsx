'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoreVertical, Moon, PanelRight, Image, PlaySquare, FileText, Smile, CornerDownLeft, Sparkles, Mic } from 'lucide-react'
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
            <PanelRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex justify-center mb-4">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            28 August 2025
          </span>
        </div>
        {chat.messages.map((message, idx) => (
          <MessageBubble key={message.id} message={message} index={idx} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="border border-gray-200 rounded-xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition bg-[#fafafa]">
          {/* Input text field */}
          <textarea
            rows={1}
            placeholder="Type something...."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 focus:outline-none placeholder-gray-400 text-gray-800 resize-none min-h-[40px] max-h-[120px]"
            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          />

          {/* Toolbar at the bottom */}
          <div className="flex items-center justify-between border-t border-gray-150 pt-2.5 mt-2">
            {/* Left toolbar icons */}
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition">
                <Image size={18} />
              </button>
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition">
                <PlaySquare size={18} />
              </button>
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition">
                <FileText size={18} />
              </button>
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition">
                <Smile size={18} />
              </button>
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition">
                <CornerDownLeft size={18} />
              </button>
            </div>

            {/* Right toolbar icons */}
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition">
                <Sparkles size={18} className="text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200/60 rounded text-gray-500 hover:text-gray-700 transition font-bold">
                <Mic size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
