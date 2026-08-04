import React, { useState, useMemo } from 'react'
import { PencilLine, Search, SlidersHorizontal, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Chat } from '@/lib/types'
import { ConversationListItem } from './ConversationListItem'
import { Dropdown } from '../ui/Dropdown'

interface ConversationListProps {
  chats: Chat[]
  selectedChatId: string | null
  onSelectChat: (id: string) => void
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ConversationList({
  chats,
  selectedChatId,
  onSelectChat,
  isSidebarOpen,
  onToggleSidebar,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Open')
  const [sortOrder, setSortOrder] = useState('Newest')

  // Filter and sort the conversations
  const filteredChats = useMemo(() => {
    let result = [...chats]

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.user.name.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
      )
    }

    // Status filter
    // For this mock CRM, we simulate "Closed" for some items and "Open" for others.
    // e.g. chats with index > 6 are "Closed"
    if (statusFilter === 'Closed') {
      result = result.filter((_, idx) => idx > 6)
    } else if (statusFilter === 'Snoozed') {
      result = [] // empty state demo
    } else {
      // Default: Open
      result = result.filter((_, idx) => idx <= 6)
    }

    // Sort order
    if (sortOrder === 'Newest') {
      // We keep the initial order as newest first
    } else if (sortOrder === 'Oldest') {
      result.reverse()
    } else if (sortOrder === 'Unread First') {
      result.sort((a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0))
    }

    return result
  }, [chats, searchQuery, statusFilter, sortOrder])

  return (
    <div className="w-[480px] border-r border-gray-200 bg-white flex flex-col h-full shrink-0 select-none">
      {/* Header */}
      <div className="h-14 px-4 border-b border-gray-150 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-all active:scale-95"
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
          </button>
          <h3 className="text-sm font-extrabold text-slate-900 leading-none">
            Michael Johnson
          </h3>
        </div>

        <button className="p-1.5 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-all active:scale-95 border border-transparent hover:border-blue-100">
          <PencilLine size={16} />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-gray-100 bg-white shrink-0">
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2 pl-9 pr-9 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-950 placeholder-gray-400"
          />
          <button className="absolute right-3 text-gray-400 hover:text-gray-700">
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="px-4 py-2.5 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
        <Dropdown
          value={statusFilter}
          options={['Open', 'Closed', 'Snoozed']}
          onChange={setStatusFilter}
        />
        <Dropdown
          value={sortOrder}
          options={['Newest', 'Oldest', 'Unread First']}
          onChange={setSortOrder}
        />
      </div>

      {/* Conversation Preview List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1 bg-white">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ConversationListItem
              key={chat.id}
              chat={chat}
              isSelected={chat.id === selectedChatId}
              onClick={() => onSelectChat(chat.id)}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-2">
              <Search size={18} />
            </div>
            <p className="text-xs font-bold text-slate-800">No chats found</p>
            <p className="text-[10px] text-gray-400 mt-1">
              Try adjusting your query or filter parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default ConversationList
