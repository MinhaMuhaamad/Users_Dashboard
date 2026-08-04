'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, PanelRight, User, Users, Plus } from 'lucide-react'
import { Avatar } from './avatar'
import { Chat } from '@/types'

interface DetailsPanelProps {
  chat: Chat | null
}

export function DetailsPanel({ chat }: DetailsPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string>('chatData')

  if (!chat) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-80 bg-gray-50 border-l border-gray-200 p-6 flex items-center justify-center"
      >
        <p className="text-gray-500 text-center">Select a chat to view details</p>
      </motion.div>
    )
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
        <h3 className="text-sm font-semibold text-gray-950">Details</h3>
        <button className="p-1 hover:bg-gray-100 rounded transition">
          <PanelRight size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Chat Data Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('chatData')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-sm text-gray-900">Chat Data</span>
            <motion.div
              animate={{ rotate: expandedSection === 'chatData' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-600" />
            </motion.div>
          </button>

          {expandedSection === 'chatData' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-4 pb-4 space-y-3"
            >
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Assignee</label>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center bg-transparent shrink-0">
                    <User size={13} className="text-gray-900" />
                  </div>
                  <span className="text-sm text-gray-950 font-semibold">{chat.assignee.name}</span>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Team</label>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center bg-transparent shrink-0">
                    <Users size={13} className="text-gray-900" />
                  </div>
                  <span className="text-sm text-gray-950 font-semibold">{chat.team.name}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Contact Data Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('contact')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-sm text-gray-900">Contact Data</span>
            <motion.div
              animate={{ rotate: expandedSection === 'contact' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-600" />
            </motion.div>
          </button>

          {expandedSection === 'contact' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-4 pb-4 space-y-3"
            >
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">First Name</label>
                <p className="text-sm text-gray-900 font-semibold mt-0.5">{chat.contact.firstName}</p>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Last Name</label>
                <p className="text-sm text-gray-900 font-semibold mt-0.5">{chat.contact.lastName}</p>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Phone number</label>
                <p className="text-sm text-gray-900 font-semibold mt-0.5">{chat.contact.phone}</p>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Email</label>
                <p className="text-sm text-gray-900 font-semibold mt-0.5">{chat.contact.email}</p>
              </div>
              <button className="text-gray-900 text-sm font-semibold hover:underline mt-1 block">See all</button>
            </motion.div>
          )}
        </div>

        {/* Contact Labels Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('labels')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-sm text-gray-900">Contact Labels</span>
            <motion.div
              animate={{ rotate: expandedSection === 'labels' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-600" />
            </motion.div>
          </button>

          {expandedSection === 'labels' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-4 pb-4 flex flex-wrap gap-2 items-center"
            >
              {chat.labels.map((label, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200"
                >
                  {label.text}
                </motion.span>
              ))}
              <button className="w-6 h-6 rounded-full border border-blue-500 hover:bg-blue-50 flex items-center justify-center text-blue-500 transition shrink-0">
                <Plus size={14} />
              </button>
            </motion.div>
          )}
        </div>

        {/* Notes Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('notes')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-sm text-gray-900">Notes</span>
            <motion.div
              animate={{ rotate: expandedSection === 'notes' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-600" />
            </motion.div>
          </button>

          {expandedSection === 'notes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-4 pb-4 space-y-2.5"
            >
              <div className="bg-[#fef9c3]/40 border border-[#fef08a] rounded-lg p-3 text-xs text-gray-500 cursor-pointer hover:bg-[#fef08a]/30 transition">
                <span>Add a note</span>
              </div>
              {chat.notes && (
                <div className="bg-[#fef08a]/60 border border-[#fde047] rounded-lg p-3 text-sm text-gray-900 font-semibold shadow-sm">
                  <p>{chat.notes}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Other Chats Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('otherChats')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-sm text-gray-900">Other Chats</span>
            <motion.div
              animate={{ rotate: expandedSection === 'otherChats' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-gray-600" />
            </motion.div>
          </button>

          {expandedSection === 'otherChats' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-4 pb-4"
            >
              <div className="p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-white"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Fit4Life</p>
                    <p className="text-xs text-gray-500 truncate">On my way!</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap self-start mt-0.5">08/08/25</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
