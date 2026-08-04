import React from 'react'
import { User as UserIcon, Inbox, UserPlus, Users, MessageSquare } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { CollapsibleSection } from './CollapsibleSection'
import { Chat } from '@/lib/types'

interface InboxSidebarProps {
  chats: Chat[]
  selectedChatId: string | null
}

export function InboxSidebar({ chats, selectedChatId }: InboxSidebarProps) {
  // Hardcoded unread counts for specific names to match the prompt's requirements
  const getMockUnreadCount = (name: string): number | null => {
    if (name.includes('Sarah Williams')) return 2
    if (name.includes('Michael Johnson')) return 11
    if (name.includes('Christopher Miller')) return 4
    if (name.includes('Amanda Garcia')) return 5
    if (name.includes('Ashley Taylor')) return 1
    if (name.includes('Jessica Thomas')) return 2
    return null
  }

  // Generate list of users from the active chats/API data
  const usersList = chats.map(c => c.user)

  // Ensure "Michael Johnson" is in the users list and highlighted
  const hasMichael = usersList.some(u => u.name.includes('Michael Johnson'))
  const displayUsers = [...usersList]
  if (!hasMichael) {
    displayUsers.unshift({
      id: 'current-user-michael',
      name: 'Michael Johnson',
      email: 'michael.johnson@boxpad.com',
      initials: 'MJ'
    })
  }

  return (
    <div className="w-[260px] border-r border-gray-200 bg-white flex flex-col h-full shrink-0 select-none overflow-y-auto">
      {/* Column Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <h2 id="inbox-header" className="text-base font-extrabold text-slate-900 tracking-tight">
          Inbox
        </h2>
      </div>

      {/* Main Inbox Categories */}
      <div className="p-3 space-y-1">
        <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2.5">
            <UserIcon size={14} className="text-gray-400" />
            <span>My Inbox</span>
          </div>
        </button>

        <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg bg-gray-100/80 text-slate-900 transition-colors">
          <div className="flex items-center gap-2.5">
            <Inbox size={14} className="text-blue-600" />
            <span className="font-bold">All</span>
          </div>
          <Badge variant="gray">28</Badge>
        </button>

        <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2.5">
            <UserPlus size={14} className="text-gray-400" />
            <span>Unassigned</span>
          </div>
          <Badge variant="gray">5</Badge>
        </button>
      </div>

      {/* Teams Collapsible Section */}
      <CollapsibleSection title="Teams" defaultOpen={true}>
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
                <Users size={11} />
              </div>
              <span>Sales</span>
            </div>
            <span className="text-xs text-gray-400">7</span>
          </div>

          <div className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-500">
                <Users size={11} />
              </div>
              <span>Customer Support</span>
            </div>
            <span className="text-xs text-gray-400">16</span>
          </div>
        </div>
      </CollapsibleSection>

      {/* Users Collapsible Section */}
      <CollapsibleSection title="Users" defaultOpen={true}>
        <div className="space-y-0.5 pt-0.5 max-h-[300px] overflow-y-auto pr-1">
          {displayUsers.map((u) => {
            const isSelected = u.name.includes('Michael Johnson')
            const count = getMockUnreadCount(u.name)
            return (
              <div
                key={u.id}
                className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-blue-50/70 text-blue-600 border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {u.initials}
                  </div>
                  <span className="truncate max-w-[120px]">{u.name}</span>
                </div>
                {count !== null && (
                  <Badge variant={isSelected ? 'blue' : 'gray'}>
                    {count}
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </CollapsibleSection>

      {/* Channels Collapsible Section */}
      <CollapsibleSection title="Channels" defaultOpen={true}>
        <div className="pt-0.5">
          <div className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold text-slate-800 bg-emerald-50/50 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
            {/* WhatsApp Logo Icon */}
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.132 1.23 8.37 3.462 2.237 2.231 3.465 5.201 3.466 8.368-.003 6.524-5.329 11.849-11.861 11.849-2.007-.001-3.98-.513-5.733-1.489L0 24zm6.524-3.662c1.656.982 3.279 1.498 4.966 1.499 5.394 0 9.782-4.387 9.784-9.78.002-5.396-4.385-9.783-9.783-9.783-5.397 0-9.786 4.388-9.788 9.783-.001 1.802.49 3.51 1.42 5.068l-.989 3.61 3.738-.98c1.513.826 3.018 1.253 4.652 1.253zm8.388-6.167c-.237-.117-1.4-.689-1.619-.768-.219-.08-.379-.117-.538.117-.16.234-.619.768-.758.927-.14.159-.28.18-.517.062-1.393-.695-2.28-1.221-3.21-2.82-.25-.429.25-.399.715-1.324.08-.16.04-.3-.02-.418-.06-.118-.538-1.298-.738-1.777-.194-.47-.393-.408-.538-.415-.14-.007-.299-.008-.458-.008-.16 0-.418.06-.638.3-.22.24-.838.82-.838 2.002 0 1.182.858 2.324.978 2.484.12.16 1.69 2.581 4.093 3.619.57.247 1.016.395 1.364.505.574.182 1.097.157 1.51.095.46-.069 1.4-.572 1.599-1.127.199-.556.199-1.033.14-1.132-.06-.1-.219-.16-.456-.278z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="leading-tight font-extrabold text-slate-800">Fit4Life</span>
              <span className="text-[10px] text-gray-400 leading-none">WhatsApp Business</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  )
}
export default InboxSidebar
