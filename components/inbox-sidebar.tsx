'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { mockTeams } from '@/lib/mock-data'

export function InboxSidebar() {
  const [teamsExpanded, setTeamsExpanded] = useState(true)
  const [usersExpanded, setUsersExpanded] = useState(false)

  return (
    <div className="w-48 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900">Inbox</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-0.5 mb-4">
          <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
            My Inbox
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between">
            <span>All</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">28</span>
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between">
            <span>Unassigned</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">5</span>
          </button>
        </div>

        <button
          onClick={() => setTeamsExpanded(!teamsExpanded)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:bg-gray-50 rounded-md"
        >
          <span>Teams</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${teamsExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        {teamsExpanded && (
          <div className="space-y-0.5 mb-4 mt-1">
            {mockTeams.map((team) => (
              <button
                key={team.name}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between"
              >
                <span>{team.name}</span>
                <span className="text-xs text-gray-500">{team.count}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setUsersExpanded(!usersExpanded)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:bg-gray-50 rounded-md"
        >
          <span>Users</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${usersExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  )
}
