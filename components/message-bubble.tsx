'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Message } from '@/types'

interface MessageBubbleProps {
  message: Message
  index: number
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-2 mb-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.isOwn
            ? 'bg-blue-100 text-blue-900'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
      </div>
    </motion.div>
  )
}
