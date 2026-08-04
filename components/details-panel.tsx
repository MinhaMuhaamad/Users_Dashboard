'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
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
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Details</h3>
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
                <label className="text-xs font-semibold text-gray-600 uppercase">Assignee</label>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar
                    initials={chat.assignee.initials}
                    name={chat.assignee.name}
                    size="sm"
                  />
                  <span className="text-sm text-gray-900">{chat.assignee.name}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Team</label>
                <p className="text-sm text-gray-900 mt-1">{chat.team.name}</p>
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
                <label className="text-xs font-semibold text-gray-600 uppercase">First Name</label>
                <p className="text-sm text-gray-900 mt-1">{chat.contact.firstName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Last Name</label>
                <p className="text-sm text-gray-900 mt-1">{chat.contact.lastName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Phone number</label>
                <p className="text-sm text-gray-900 mt-1">{chat.contact.phone}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Email</label>
                <p className="text-sm text-gray-900 mt-1">{chat.contact.email}</p>
              </div>
              <button className="text-blue-600 text-sm font-medium hover:underline">See all</button>
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
              className="px-4 pb-4 flex flex-wrap gap-2"
            >
              {chat.labels.map((label, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    label.color === 'blue'
                      ? 'bg-blue-100 text-blue-700'
                      : label.color === 'green'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {label.text}
                </motion.span>
              ))}
              <button className="text-gray-400 hover:text-gray-600 transition">
                <span className="text-xl">+</span>
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
              className="px-4 pb-4"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-sm text-gray-900">{chat.notes}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
