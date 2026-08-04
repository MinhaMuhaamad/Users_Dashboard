'use client'

import React, { useState } from 'react'
import { ChevronDown, User, List, LifeBuoy, Globe, MessageSquare } from 'lucide-react'
import { mockTeams } from '@/lib/mock-data'

export function InboxSidebar() {
  const [teamsExpanded, setTeamsExpanded] = useState(true)
  const [usersExpanded, setUsersExpanded] = useState(true)
  const [channelsExpanded, setChannelsExpanded] = useState(true)

  return (
    <div className="w-48 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900">Inbox</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Main Sections */}
        <div className="space-y-0.5">
          <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md flex items-center gap-2">
            <User size={16} className="text-gray-700" />
            <span>My Inbox</span>
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <List size={16} className="text-gray-500" />
              <span>All</span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">28</span>
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LifeBuoy size={16} className="text-gray-500" />
              <span>Unassigned</span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">5</span>
          </button>
        </div>

        {/* Teams Section */}
        <div>
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
            <div className="space-y-0.5 mt-1">
              {mockTeams.map((team) => (
                <button
                  key={team.name}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Globe size={15} className="text-gray-400" />
                    <span>{team.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{team.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Users Section */}
        <div>
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
          {usersExpanded && (
            <div className="space-y-2 mt-1.5 px-3 py-1 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded w-full" />
              <div className="h-2.5 bg-gray-200 rounded w-[85%]" />
              <div className="h-2.5 bg-gray-200 rounded w-[90%]" />
              <div className="h-2.5 bg-gray-200 rounded w-[70%]" />
              <div className="h-2.5 bg-gray-200 rounded w-[80%]" />
              <div className="h-2.5 bg-gray-200 rounded w-[65%]" />
              <div className="h-2.5 bg-gray-200 rounded w-[75%]" />
              <div className="h-2.5 bg-gray-200 rounded w-[50%]" />
            </div>
          )}
        </div>

        {/* Channels Section */}
        <div>
          <button
            onClick={() => setChannelsExpanded(!channelsExpanded)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:bg-gray-50 rounded-md"
          >
            <span>Channels</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${channelsExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          {channelsExpanded && (
            <div className="space-y-0.5 mt-1">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2 bg-gray-50 border border-gray-200/50">
                <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.42 1.453 5.378 1.455 5.86 0 10.627-4.767 10.63-10.628.002-2.84-1.102-5.511-3.11-7.52C17.433 4.453 14.76 3.35 11.992 3.35c-5.866 0-10.63 4.767-10.634 10.629-.002 2.0.524 3.951 1.527 5.679L1.82 22.18l2.91-.763c1.66.9 3.524 1.375 5.42 1.378H10.15zM17.15 13.9c-.285-.143-1.688-.833-1.95-.929-.26-.095-.45-.143-.64.143-.19.285-.736.929-.903 1.12-.167.19-.334.214-.618.071-.285-.143-1.204-.444-2.293-1.415-.848-.756-1.42-1.69-1.587-1.975-.167-.285-.018-.44.125-.581.13-.127.285-.333.428-.5.143-.166.19-.285.285-.475.095-.19.047-.356-.024-.5-.071-.142-.64-1.543-.877-2.115-.23-.556-.464-.48-.64-.49-.166-.008-.356-.01-.547-.01-.19 0-.5.07-.76.356-.26.285-.997.974-.997 2.378s1.02 2.76 1.164 2.95c.143.19 2.007 3.066 4.863 4.298.68.293 1.21.468 1.62.597.683.217 1.3.187 1.79.113.546-.08 1.688-.69 1.925-1.356.237-.666.237-1.237.167-1.356-.07-.12-.285-.19-.57-.333z"/>
                  </svg>
                </span>
                <span className="font-medium">Fit4Life</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
