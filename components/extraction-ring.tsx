'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function ExtractionRing() {
  return (
    <div className="relative w-52 h-52 flex items-center justify-center">
      {/* Outer ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-400/40 to-blue-500/30 blur-2xl"
      />

      {/* Particle wisps orbiting */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <motion.div
            key={deg}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300"
            style={{
              transform: `rotate(${deg}deg) translateX(92px)`,
              marginTop: -3,
              marginLeft: -3,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </motion.div>

      {/* Main energy ring - outer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg width="208" height="208" viewBox="0 0 208 208" fill="none">
          <defs>
            <linearGradient id="energyRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.3" />
            </linearGradient>
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="104"
            cy="104"
            r="90"
            stroke="url(#energyRing)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="180 380"
            filter="url(#ringGlow)"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Inner wispy ring counter-rotate */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4"
      >
        <svg width="176" height="176" viewBox="0 0 176 176" fill="none">
          <defs>
            <linearGradient id="innerWisp" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <circle
            cx="88"
            cy="88"
            r="75"
            stroke="url(#innerWisp)"
            strokeWidth="3"
            strokeDasharray="60 200 30 200"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* Center nebula glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-indigo-600/30 blur-xl"
      />

      {/* Third fine ring */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.02, 1] }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute inset-6"
      >
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <circle
            cx="80"
            cy="80"
            r="68"
            stroke="#22d3ee"
            strokeWidth="1"
            strokeDasharray="20 40"
            strokeOpacity="0.5"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  )
}
