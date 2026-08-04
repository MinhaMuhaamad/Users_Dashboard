'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, ChevronDown } from 'lucide-react'
import { Avatar } from './avatar'
import { mockTeams } from '@/lib/mock-data'

interface SidebarProps {
  currentUser: { name: string; initials: string }
}

export function Sidebar({ currentUser }: SidebarProps) {
  const [expandedTeam, setExpandedTeam] = useState<string | null>('Sales')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-48 bg-white border-r border-gray-200 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">heyy</h1>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded transition">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Avatar initials={currentUser.initials} name={currentUser.name} size="sm" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1 mb-6">
          {['Inbox', 'Contacts', 'AI Employees', 'Workflows', 'Campaigns'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Teams</div>
        <div className="space-y-1">
          {mockTeams.map((team) => (
            <div key={team.name}>
              <button
                onClick={() => setExpandedTeam(expandedTeam === team.name ? null : team.name)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition flex items-center justify-between"
              >
                <span>{team.name}</span>
                <span className="text-xs text-gray-500">{team.count}</span>
              </button>
              {expandedTeam === team.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pl-4 space-y-1"
                >
                  {['Item 1', 'Item 2'].map((item) => (
                    <button key={item} className="w-full text-left px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition">
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide mt-6">Users</div>
        <div className="space-y-1">
          {['Sarah Williams', 'Michael Johnson', 'Emily Davis', 'Christopher Miller', 'Amanda Garcia', 'Joshua Martinez', 'Ashley Taylor', 'Daniel Anderson', 'Jessica Thomas'].map((name, idx) => (
            <button key={name} className="w-full text-left px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition">
              {name}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide mt-6">Channels</div>
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded transition flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Fit4Life
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-pink-600 hover:bg-pink-50 rounded transition flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            Fit4Life
          </button>
        </div>
      </div>
    </motion.div>
  )
}
