import React from 'react'
import { Chat } from '@/lib/types'
import { Avatar } from '../ui/Avatar'

interface ConversationListItemProps {
  chat: Chat
  isSelected: boolean
  onClick: () => void
}

export function ConversationListItem({ chat, isSelected, onClick }: ConversationListItemProps) {
  const { user, lastMessage, timestamp, unread } = chat

  return (
    <div
      onClick={onClick}
      className={`p-3.5 mx-2 rounded-xl flex gap-3.5 cursor-pointer transition-all duration-200 select-none group relative border border-transparent ${
        isSelected
          ? 'bg-slate-100/90 border-slate-200/40 shadow-sm'
          : 'bg-white hover:bg-slate-50 border-gray-100/30'
      }`}
    >
      {/* Avatar Container */}
      <div className="relative shrink-0">
        <Avatar initials={user.initials} name={user.name} userId={user.id} size="md" />
        {unread && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-600 border-2 border-white rounded-full animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-0.5">
          <h4 className={`text-xs text-slate-900 truncate leading-none ${
            unread ? 'font-extrabold text-black' : 'font-bold'
          }`}>
            {user.name}
          </h4>
          
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap pl-2">
            {timestamp}
          </span>
        </div>

        <p className={`text-xs truncate leading-relaxed ${
          unread ? 'text-slate-800 font-medium' : 'text-gray-500'
        }`}>
          {lastMessage}
        </p>
      </div>
    </div>
  )
}
export default ConversationListItem
