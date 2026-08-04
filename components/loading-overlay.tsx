'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Sparkles,
  Users,
  GitBranch,
  Target,
  UserPlus,
} from 'lucide-react'
import { CircularBgGlow } from './circular-bg-glow'
import { HexagonIcon } from './hexagon-icon'
import { ExtractionRing } from './extraction-ring'
import { ScaledDashboardPreview, ScaledDashboardSkeleton } from './scaled-dashboard-preview'
import { Chat } from '@/types'

const WHITE_PANEL_BASE_HEIGHT = 42 // vh — keep exactly the same

interface LoadingOverlayProps {
  isVisible: boolean
  chats: Chat[]
  selectedChatId: string | null
  expandProgress: number
  onExpand: () => void
  isLoading?: boolean
}

export function LoadingOverlay({
  isVisible,
  chats,
  selectedChatId,
  expandProgress,
  onExpand,
  isLoading = true,
}: LoadingOverlayProps) {
  if (!isVisible) return null

  const [stage, setStage] = React.useState<'hidden' | 'skeleton' | 'data'>('hidden')

  React.useEffect(() => {
    if (isLoading) {
      setStage('hidden')
    } else {
      if (stage === 'hidden') {
        setStage('skeleton')
        const timer = setTimeout(() => {
          setStage('data')
        }, 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [isLoading, stage])

  const panelHeight = WHITE_PANEL_BASE_HEIGHT + expandProgress * (100 - WHITE_PANEL_BASE_HEIGHT)
  const marginDynamic = stage === 'hidden' ? '0vh' : `${panelHeight}vh`

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-[#0a1628] to-cyan-700 flex flex-col items-center z-50 overflow-hidden"
    >
      <CircularBgGlow />

      {/* Side light streaks like reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/10 via-blue-600/5 to-transparent skew-x-12" />
        <div className="absolute -right-20 top-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/10 via-blue-500/5 to-transparent -skew-x-12" />
      </div>

      {/* Honeycomb hexagonal icons — positioned around center ring */}
      <HexagonIcon icon={Sparkles} className="absolute top-[14%] left-[18%]" delay={0} />
      <HexagonIcon icon={Mail} className="absolute top-[28%] left-[10%]" delay={0.15} />
      <HexagonIcon icon={Users} className="absolute top-[42%] left-[14%]" delay={0.3} />
      <HexagonIcon icon={UserPlus} className="absolute top-[16%] right-[16%]" delay={0.1} />
      <HexagonIcon icon={GitBranch} className="absolute top-[32%] right-[10%]" delay={0.25} />
      <HexagonIcon icon={Target} className="absolute top-[46%] right-[14%]" delay={0.4} />

      {/* Central extraction content */}
      <div
        className="relative z-10 flex flex-col items-center gap-5 transition-all duration-700 ease-in-out"
        style={{ marginBottom: marginDynamic, paddingBottom: '2rem' }}
      >
        <ExtractionRing />

        <motion.h1
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-4xl font-bold text-white text-center tracking-tight"
        >
          Extracting Information...
        </motion.h1>

        <motion.p
          animate={{ opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
          className="text-base text-gray-300/90 text-center max-w-lg px-6 leading-relaxed"
        >
          We are extracting information from the above honey combs to your system
        </motion.p>

        {expandProgress < 0.05 && stage === 'data' && (
          <motion.p
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-cyan-300/70 mt-1"
          >
            Scroll down or click the panel below to expand
          </motion.p>
        )}
      </div>

      {/* Bottom white panel — fixed size base, grows on scroll */}
      <motion.div
        initial={{ y: '100%', opacity: 0, x: '-50%' }}
        animate={{
          y: stage === 'hidden' ? '100%' : 0,
          opacity: stage === 'hidden' ? 0 : 1,
          x: '-50%'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={stage === 'data' ? onExpand : undefined}
        className="absolute bottom-0 left-1/2 w-[96%] max-w-6xl bg-white rounded-t-2xl shadow-[0_-12px_48px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer group"
        style={{ height: `${panelHeight}vh` }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (stage === 'data' && (e.key === 'Enter' || e.key === ' ')) onExpand()
        }}
        aria-label="Click or scroll to open full dashboard"
      >
        {/* Scroll progress indicator */}
        {expandProgress > 0 && expandProgress < 1 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-30">
            <div
              className="h-full bg-blue-500 transition-all duration-150"
              style={{ width: `${expandProgress * 100}%` }}
            />
          </div>
        )}

        <div className="h-full w-full overflow-hidden">
          {stage === 'data' && chats.length > 0 && selectedChatId ? (
            <ScaledDashboardPreview chats={chats} selectedChatId={selectedChatId} />
          ) : (
            <ScaledDashboardSkeleton />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
