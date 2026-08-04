import React from 'react'
import { Settings, Inbox, Users, Sparkles, GitBranch, Megaphone, LucideIcon } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { HoneycombIcon } from './HoneycombIcon'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'ai-employees', label: 'AI Employees', icon: Sparkles },
  { id: 'workflows', label: 'Workflows', icon: GitBranch },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
]

interface TopNavProps {
  activeTab: string
  onTabSelect: (tabId: string) => void
  currentUser: { name: string; initials: string }
}

export function TopNav({ activeTab, onTabSelect, currentUser }: TopNavProps) {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-6 shrink-0 bg-white justify-between relative z-30 select-none">
      {/* Left: Logo */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            BOX<span className="text-blue-600">pad</span>
          </span>
        </div>

        {/* Center-Left: Navigation tabs */}
        <nav className="flex items-center gap-4">
          {navItems.map((item) => {
            const isSelected = item.id === activeTab
            return (
              <button
                key={item.id}
                onClick={() => onTabSelect(item.id)}
                className={`flex items-center gap-2.5 px-3 py-1 rounded-full transition-all duration-200 ${
                  isSelected 
                    ? 'bg-gray-100 shadow-sm text-slate-950 font-semibold' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {/* Honeycomb Icon wrapper */}
                <HoneycombIcon 
                  icon={item.icon} 
                  isSelected={isSelected} 
                  size="sm" 
                  className="scale-90"
                />
                <span className="text-xs font-semibold tracking-wide pr-1">
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Right: Settings & User Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all active:scale-95">
          <Settings size={18} />
        </button>

        <div className="h-5 w-[1px] bg-gray-200" />

        <div className="flex items-center gap-2.5 pl-1">
          <Avatar initials="M" name="Michael Johnson" className="bg-pink-500 text-white font-bold" size="sm" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-gray-400">
              Agent Account
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TopNav
