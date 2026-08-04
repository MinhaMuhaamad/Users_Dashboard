'use client'

import React, { useId } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface HexagonIconProps {
  icon: LucideIcon
  className?: string
  delay?: number
}

export function HexagonIcon({ icon: Icon, className = '', delay = 0 }: HexagonIconProps) {
  const gradId = useId()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 },
      }}
      className={`relative ${className}`}
    >
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none" className="drop-shadow-lg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c1929" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0f2744" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M36 2 L68 20 L68 56 L36 74 L4 56 L4 20 Z"
          fill={`url(#${gradId})`}
          stroke="#1e40af"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <path
          d="M36 2 L68 20 L68 56 L36 74 L4 56 L4 20 Z"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pb-1">
        <Icon size={26} className="text-cyan-300/90" strokeWidth={1.5} />
      </div>
    </motion.div>
  )
}
