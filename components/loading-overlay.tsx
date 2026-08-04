'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Users, Share2, CheckCircle2 } from 'lucide-react'

interface LoadingOverlayProps {
  isVisible: boolean
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-600 flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Subtle animated background glow */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"
      />

      {/* Hexagonal Icons - Exact Positions from Design */}
      
      {/* Top Left: Mail Icon */}
      <div className="absolute top-16 left-16">
        <div className="w-16 h-16 border border-blue-600 rounded-lg flex items-center justify-center bg-blue-950/40 backdrop-blur-sm">
          <Mail size={28} className="text-blue-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Top Center-Left: Sparkles Icon */}
      <div className="absolute top-12 left-1/3 transform -translate-x-1/2">
        <div className="w-16 h-16 border border-blue-600 rounded-lg flex items-center justify-center bg-blue-950/40 backdrop-blur-sm">
          <Sparkles size={28} className="text-blue-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Top Right: Users Icon */}
      <div className="absolute top-8 right-16">
        <div className="w-16 h-16 border border-blue-500 rounded-lg flex items-center justify-center bg-blue-900/60 backdrop-blur-sm">
          <Users size={28} className="text-cyan-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Middle Left: Users Icon (single user) */}
      <div className="absolute top-1/3 left-12">
        <div className="w-16 h-16 border border-blue-600 rounded-lg flex items-center justify-center bg-blue-950/40 backdrop-blur-sm">
          <Users size={28} className="text-blue-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Middle Right: Network/Share Icon */}
      <div className="absolute top-1/2 right-20 transform -translate-y-1/2">
        <div className="w-16 h-16 border border-blue-500 rounded-lg flex items-center justify-center bg-blue-900/50 backdrop-blur-sm">
          <Share2 size={28} className="text-cyan-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Bottom Right: Settings/Gear Icon with Checkmark */}
      <div className="absolute bottom-20 right-12">
        <div className="w-16 h-16 border border-blue-500 rounded-lg flex items-center justify-center bg-cyan-600/40 backdrop-blur-sm">
          <CheckCircle2 size={28} className="text-cyan-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Ring Container */}
        <div className="relative w-40 h-40">
          {/* Outer glow */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-xl opacity-40"
          />

          {/* Rotating Ring */}
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
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
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

          {/* Inner rotating ring counter-direction */}
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

        {/* Title */}
        <motion.h1
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-bold text-white text-center"
        >
          Extracting Information...
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          className="text-lg text-gray-300 text-center max-w-md"
        >
          We are extracting information from the above honey combs to your system
        </motion.p>
      </div>

      {/* Bottom Card Preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-0 w-11/12 max-w-4xl h-48 bg-white rounded-t-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex h-full">
          {/* Sidebar Skeleton */}
          <div className="w-32 bg-gray-100 border-r border-gray-200 p-3 flex flex-col gap-2">
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>

          {/* Chat List Skeleton */}
          <div className="w-48 bg-white border-r border-gray-200 p-3 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="w-40 bg-gray-50 border-l border-gray-200 p-3 flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
