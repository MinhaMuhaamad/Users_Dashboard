import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Users, GitBranch, Target, ShieldAlert } from 'lucide-react'
import { HoneycombIcon } from '../layout/HoneycombIcon'
import { SkeletonDashboard } from './SkeletonDashboard'

interface LoadingOverlayProps {
  activeTab: string
  error: Error | null
}

export function LoadingOverlay({ activeTab, error }: LoadingOverlayProps) {
  // Translate tab ID to user-friendly label
  const getTabLabel = (id: string) => {
    switch (id) {
      case 'inbox': return 'Inbox'
      case 'contacts': return 'Contacts'
      case 'ai-employees': return 'AI Employees'
      case 'workflows': return 'Workflows'
      case 'campaigns': return 'Campaigns'
      default: return 'Information'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 bg-gradient-to-tr from-[#0a0f1e] via-[#0d1b3a] to-[#1e5fb0] flex flex-col items-center justify-between z-50 overflow-hidden text-white select-none"
    >
      {/* Background glowing spot in top-right */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Hexagons Scattered around */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left */}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[12%] opacity-30"
        >
          <HoneycombIcon icon={Sparkles} isSelected={false} size="lg" className="text-white bg-slate-900/60" />
        </motion.div>

        {/* Middle Left */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[40%] left-[8%] opacity-20"
        >
          <HoneycombIcon icon={Mail} isSelected={false} size="lg" className="text-white bg-slate-900/60" />
        </motion.div>

        {/* Bottom Left */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[65%] left-[15%] opacity-25"
        >
          <HoneycombIcon icon={Users} isSelected={false} size="lg" className="text-white bg-slate-900/60" />
        </motion.div>

        {/* Top Right */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-[18%] right-[12%] opacity-25"
        >
          <HoneycombIcon icon={GitBranch} isSelected={false} size="lg" className="text-white bg-slate-900/60" />
        </motion.div>

        {/* Middle Right */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-[45%] right-[8%] opacity-35"
        >
          <HoneycombIcon icon={Target} isSelected={false} size="lg" className="text-white bg-slate-900/60" />
        </motion.div>
      </div>

      {/* Central Content Column */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 mt-8">
        
        {error ? (
          <div className="flex flex-col items-center text-center max-w-md animate-fade-in">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center mb-6 text-red-500">
              <ShieldAlert size={36} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Connection Failed</h2>
            <p className="text-gray-300 text-sm mb-4">
              Unable to sync data from the dummy API. Click below to try again or bypass.
            </p>
            <p className="text-red-400 text-xs italic bg-slate-950/40 px-3 py-2 rounded-lg border border-red-900/20">
              {error.message || 'Unknown network error'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Spinning glowing conic gradient ring */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  background: 'conic-gradient(from 0deg, #2563EB, #06B6D4, transparent, #2563EB)',
                  maskImage: 'radial-gradient(ellipse at center, transparent 65%, black 66%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 65%, black 66%)',
                }}
              />

              {/* Pulsing Core Ring */}
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-72 h-72 rounded-full bg-[#0a1128]/80 border border-blue-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.45)]"
              >
                {/* Center text/icon */}
                <motion.div 
                  animate={{ scale: [0.93, 1.02, 0.93] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <Sparkles size={40} className="text-cyan-400 mb-2 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">
                    BOXpad Sync
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Status Information */}
            <div className="mt-12 text-center max-w-lg">
              <motion.h2
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-3xl font-extrabold tracking-tight"
              >
                Extracting {getTabLabel(activeTab)} Info…
              </motion.h2>
              <motion.p
                animate={{ opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                className="text-gray-400 text-sm mt-3 leading-relaxed"
              >
                We are extracting information from the above honeycombs to your system.
              </motion.p>
            </div>
          </div>
        )}

      </div>

      {/* Drawer Preview Peeking from the bottom */}
      <div className="w-[90%] max-w-7xl h-36 bg-slate-900/40 rounded-t-3xl border-t border-x border-slate-700/50 backdrop-blur-md overflow-hidden relative opacity-70 group shadow-[0_-20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-start">
        {/* Subtle separator */}
        <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mt-3 mb-2 shrink-0" />
        
        {/* Render a dimmed dashboard skeleton mockup inside */}
        <div className="w-full flex-1 opacity-20 pointer-events-none scale-100 origin-top">
          <SkeletonDashboard />
        </div>
      </div>
    </motion.div>
  )
}
export default LoadingOverlay
