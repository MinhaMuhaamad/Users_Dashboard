import React from 'react'
import { CheckCheck } from 'lucide-react'
import { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { text, timestamp, isOwn } = message

  // Function to regex check and wrap URLs in styled links
  const renderMessageText = (rawText: string) => {
    // Regex for capturing URLs like www.Fit4Life.com/Premium or http(s)://...
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g
    const parts = rawText.split(urlRegex)

    if (parts.length === 1) return rawText

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        const href = part.startsWith('http') ? part : `https://${part}`
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:underline break-all inline-flex items-center"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  if (!isOwn) {
    // Incoming Message (Left-aligned, Gray background)
    return (
      <div className="flex flex-col items-start mb-4 max-w-[75%] relative select-text">
        {/* Timestamp above-right of the bubble */}
        <div className="flex items-center gap-1.5 mb-1 px-1">
          <span className="text-[10px] text-gray-400 font-bold">
            {timestamp}
          </span>
        </div>
        <div className="bg-[#F3F4F6] text-slate-800 text-xs px-4 py-3 rounded-2xl rounded-tl-none font-medium leading-relaxed shadow-sm">
          {renderMessageText(text)}
        </div>
      </div>
    )
  }

  // Outgoing Message (Right-aligned, Lavender background)
  return (
    <div className="flex flex-col items-end mb-4 max-w-[75%] ml-auto relative select-text">
      <div className="bg-[#EDE9FE] text-slate-900 text-xs px-4 py-3 rounded-2xl rounded-tr-none font-medium leading-relaxed shadow-sm border border-purple-100/50">
        {renderMessageText(text)}
      </div>
      
      {/* Timestamp & Double Check under the message bubble */}
      <div className="flex items-center gap-1 mt-1.5 px-1">
        <span className="text-[10px] text-gray-400 font-bold leading-none">
          {timestamp}
        </span>
        <CheckCheck size={13} className="text-blue-500 shrink-0" />
      </div>
    </div>
  )
}
export default MessageBubble
