'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Users, Share2, CheckCircle2 } from 'lucide-react'
import { DashboardContent } from './dashboard-content'
import { Chat } from '@/types'

interface LoadingOverlayProps {
  isVisible: boolean
  isLoading: boolean
  chats: Chat[]
  selectedChatId: string | null
  onExpand: () => void
}

function DashboardSkeleton() {
  return (
    <div className="flex h-full w-full">
      {/* Sidebar Skeleton */}
      <div className="w-[12%] min-w-[80px] bg-gray-50 border-r border-gray-200 p-3 flex flex-col gap-2 shrink-0">
        <div className="h-5 bg-gray-300 rounded-md w-3/4 animate-pulse" />
        <div className="space-y-2 mt-2">
          <div className="h-3.5 bg-gray-300 rounded w-full animate-pulse" />
          <div className="h-3.5 bg-gray-300 rounded w-5/6 animate-pulse" />
          <div className="h-3.5 bg-gray-300 rounded w-4/5 animate-pulse" />
          <div className="h-3.5 bg-gray-300 rounded w-full animate-pulse" />
        </div>
      </div>

      {/* Chat List Skeleton */}
      <div className="w-[18%] min-w-[100px] bg-white border-r border-gray-200 p-3 flex flex-col gap-3 shrink-0">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-7 h-7 bg-gray-300 rounded-full shrink-0 animate-pulse" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse" />
              <div className="h-2.5 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window Skeleton */}
      <div className="flex-1 p-4 space-y-3 border-r border-gray-200">
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse" />
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3/5 animate-pulse" />
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="w-[15%] min-w-[80px] bg-gray-50 border-l border-gray-200 p-3 flex flex-col gap-3 shrink-0">
        <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function LoadingOverlay({
  isVisible,
  isLoading,
  chats,
  selectedChatId,
  onExpand,
}: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-600 flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Subtle animated background glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"
      />

      {/* Hexagonal Icons */}
      <div className="absolute top-16 left-16">
        <div className="w-16 h-16 border border-blue-600 rounded-lg flex items-center justify-center bg-blue-950/40 backdrop-blur-sm">
          <Mail size={28} className="text-blue-400" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-12 left-1/3 transform -translate-x-1/2">
        <div className="w-16 h-16 border border-blue-600 rounded-lg flex items-center justify-center bg-blue-950/40 backdrop-blur-sm">
          <Sparkles size={28} className="text-blue-300" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-8 right-16">
        <div className="w-16 h-16 border border-blue-500 rounded-lg flex items-center justify-center bg-blue-900/60 backdrop-blur-sm">
          <Users size={28} className="text-cyan-300" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-1/3 left-12">
        <div className="w-16 h-16 border border-blue-600 rounded-lg flex items-center justify-center bg-blue-950/40 backdrop-blur-sm">
          <Users size={28} className="text-blue-400" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-1/2 right-20 transform -translate-y-1/2">
        <div className="w-16 h-16 border border-blue-500 rounded-lg flex items-center justify-center bg-blue-900/50 backdrop-blur-sm">
          <Share2 size={28} className="text-cyan-400" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute bottom-[44vh] right-12">
        <div className="w-16 h-16 border border-blue-500 rounded-lg flex items-center justify-center bg-cyan-600/40 backdrop-blur-sm">
          <CheckCircle2 size={28} className="text-cyan-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 mb-[38vh]">
        <div className="relative w-40 h-40">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-xl opacity-40"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, linear: true }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#ringGradient)"
                strokeWidth="4"
                strokeDasharray="220"
                strokeDashoffset="55"
                opacity="1"
                filter="url(#glow)"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3.5, repeat: Infinity, linear: true }}
            className="absolute inset-2 flex items-center justify-center"
          >
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <defs>
                <linearGradient id="innerRingGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="url(#innerRingGradient)"
                strokeWidth="2"
                strokeDasharray="150"
                strokeDashoffset="30"
                opacity="0.6"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        <motion.h1
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-bold text-white text-center"
        >
          Extracting Information...
        </motion.h1>

        <motion.p
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          className="text-lg text-gray-300 text-center max-w-md px-4"
        >
          We are extracting information from the above honey combs to your system
        </motion.p>
      </div>

      {/* Bottom Dashboard Preview - clickable to expand */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        onClick={onExpand}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.998 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[96%] max-w-6xl h-[42vh] bg-white rounded-t-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer group"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onExpand()
        }}
        aria-label="Click to open full dashboard"
      >
        {/* Hover hint */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Click to open full dashboard
          </span>
        </div>

        <div className="h-full w-full overflow-hidden relative">
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div
              className="origin-top-left pointer-events-none absolute top-0 left-0"
              style={{
                width: 1440,
                height: 900,
                transform: 'scale(0.42)',
                transformOrigin: 'top left',
              }}
            >
              <DashboardContent
                chats={chats}
                selectedChatId={selectedChatId}
                interactive={false}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
