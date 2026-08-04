'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function CircularBgGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Radial center glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[100px]"
      />

      {/* Rotating concentric rings */}
      {[320, 420, 520, 620].map((size, i) => (
        <motion.div
          key={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] rounded-full border border-cyan-400/20"
          style={{ width: size, height: size }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.08, 0.25, 0.08] }}
          transition={{
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Glowing arc segments */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]"
        width="700"
        height="700"
        viewBox="0 0 700 700"
        fill="none"
      >
        <defs>
          <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="arcGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '350px 350px' }}
        >
          <circle
            cx="350"
            cy="350"
            r="280"
            stroke="url(#arcGrad1)"
            strokeWidth="1.5"
            strokeDasharray="120 800"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '350px 350px' }}
        >
          <circle
            cx="350"
            cy="350"
            r="240"
            stroke="url(#arcGrad2)"
            strokeWidth="1"
            strokeDasharray="80 600"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: 360, opacity: [0.1, 0.4, 0.1] }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ transformOrigin: '350px 350px' }}
        >
          <circle
            cx="350"
            cy="350"
            r="200"
            stroke="#22d3ee"
            strokeWidth="0.5"
            strokeDasharray="40 400"
            strokeOpacity="0.3"
            fill="none"
          />
        </motion.g>
      </svg>

      {/* Light beam streaks */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute top-1/2 left-1/2 origin-left h-px w-[40vw] bg-gradient-to-r from-cyan-400/40 via-blue-400/20 to-transparent"
          style={{ transform: `translateY(-50%) rotate(${deg}deg)` }}
          animate={{ opacity: [0.05, 0.3, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
