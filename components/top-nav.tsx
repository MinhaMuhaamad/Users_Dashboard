'use client'

import React from 'react'
import { Settings, Inbox, Users, Sparkles, GitBranch, Megaphone } from 'lucide-react'
import { Avatar } from './avatar'

interface TopNavProps {
  currentUser: { name: string; initials: string }
}

const navItems = [
  { label: 'Inbox', icon: Inbox, active: true },
  { label: 'Contacts', icon: Users, active: false },
  { label: 'AI Employees', icon: Sparkles, active: false },
  { label: 'Workflows', icon: GitBranch, active: false },
  { label: 'Campaigns', icon: Megaphone, active: false },
]

export function TopNav({ currentUser }: TopNavProps) {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-4 shrink-0 bg-white">
      <div className="flex items-center gap-8 flex-1">
        <h1 className="text-xl font-bold text-blue-600 tracking-tight">BOXpad</h1>
        <nav className="flex items-center gap-1">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition ${
                active
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 hover:bg-gray-100 rounded transition">
          <Settings size={20} className="text-gray-600" />
        </button>
        <Avatar initials={currentUser.initials} name={currentUser.name} size="sm" />
        <span className="text-sm font-medium text-gray-900">{currentUser.name}</span>
      </div>
    </div>
  )
}
