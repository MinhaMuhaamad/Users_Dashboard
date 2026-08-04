import React, { useRef, useEffect } from 'react'
import { MoreVertical, Moon, PanelRightClose, PanelRight } from 'lucide-react'
import { Chat, Message } from '@/lib/types'
import { MessageBubble } from './MessageBubble'
import { Composer } from './Composer'
import { Pill } from '../ui/Pill'

interface ChatThreadProps {
  chat: Chat | null
  onSendMessage: (chatId: string, text: string) => void
  isDetailsOpen: boolean
  onToggleDetails: () => void
}

export function ChatThread({
  chat,
  onSendMessage,
  isDetailsOpen,
  onToggleDetails,
}: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat?.messages])

  if (!chat) {
    return (
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200/50">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-900">No Chat Selected</h3>
        <p className="text-xs text-gray-400 max-w-[240px] mt-1">
          Select a conversation from the sidebar to view details and reply.
        </p>
      </div>
    )
  }

  const handleSend = (text: string) => {
    onSendMessage(chat.id, text)
  }

  return (
    <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="h-14 px-6 border-b border-gray-150 bg-white flex items-center justify-between shrink-0 select-none z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-extrabold text-slate-900">
            {chat.user.name}
          </h3>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <button className="p-1.5 hover:bg-gray-100 hover:text-slate-800 rounded-lg transition-all active:scale-95">
            <MoreVertical size={16} />
          </button>
          
          <button className="p-1.5 hover:bg-gray-100 hover:text-slate-800 rounded-lg transition-all active:scale-95">
            <Moon size={16} />
          </button>

          <button
            onClick={onToggleDetails}
            className={`p-1.5 rounded-lg transition-all active:scale-95 ${
              isDetailsOpen 
                ? 'bg-slate-100 text-slate-950 font-semibold' 
                : 'hover:bg-gray-100 hover:text-slate-800'
            }`}
            title={isDetailsOpen ? 'Hide contact details' : 'Show contact details'}
          >
            {isDetailsOpen ? <PanelRightClose size={16} /> : <PanelRight size={16} />}
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1"
      >
        {/* Date pill divider */}
        <div className="flex justify-center my-4 select-none">
          <Pill variant="filled" color="gray" className="text-[10px] font-bold py-0.5 px-3 bg-gray-200/60 text-gray-500">
            28 August 2025
          </Pill>
        </div>

        {/* Message bubbles list */}
        <div className="flex-1 flex flex-col">
          {chat.messages.length > 0 ? (
            chat.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
              <span className="text-xs text-gray-400">No messages in this chat yet.</span>
            </div>
          )}
        </div>
      </div>

      {/* Composer Input Box */}
      <Composer onSendMessage={handleSend} />
    </div>
  )
}
export default ChatThread
