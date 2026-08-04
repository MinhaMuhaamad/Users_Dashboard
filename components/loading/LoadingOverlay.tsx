import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Users, GitBranch, Target, ShieldAlert } from 'lucide-react'
import { SkeletonDashboard } from './SkeletonDashboard'

interface LoadingOverlayProps {
  activeTab: string
  error: Error | null
}

interface HexagonTileProps {
  icon: React.ComponentType<{ className?: string; size?: number }>
  left: string
  top: string
  opacityClass: string
  iconOpacity: number
  blueTinted?: boolean
  delay: number
}

// Custom flat-top hexagon with rounded corners using an optimized SVG path
function HexagonTile({
  icon: Icon,
  left,
  top,
  opacityClass,
  iconOpacity,
  blueTinted = false,
  delay
}: HexagonTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="absolute -translate-x-1/2 -translate-y-1/2 shrink-0 select-none pointer-events-none"
      style={{
        left,
        top,
        width: '76px',
        height: '88px',
      }}
    >
      {/* Hexagon base */}
      <svg
        viewBox="0 0 100 115"
        className={`w-full h-full drop-shadow-md transition-all duration-300 ${
          blueTinted 
            ? 'text-blue-500/8 border-blue-400/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
            : 'text-white/5 border-white/5'
        }`}
      >
        <path
          d="M 28 5 L 72 5 Q 78 5 81 9 L 98 47 Q 100 52 98 57 L 81 95 Q 78 99 72 99 L 28 99 Q 22 99 19 95 L 2 57 Q 0 52 2 47 L 19 9 Q 22 5 28 5 Z"
          fill={blueTinted ? 'rgba(30, 95, 176, 0.15)' : 'rgba(255, 255, 255, 0.05)'}
          stroke={blueTinted ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255, 255, 255, 0.08)'}
          strokeWidth="2"
        />
      </svg>

      {/* Centered Icon */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ opacity: iconOpacity }}
      >
        <Icon size={24} className={blueTinted ? 'text-blue-200' : 'text-gray-300'} />
      </div>
    </motion.div>
  )
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B14] text-white overflow-hidden"
    >
      {/* 1. Canvas frame (1440x869 or full screen layout with soft border & corner mask) */}
      <div 
        className="relative w-full h-full max-w-[1440px] max-h-[869px] rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between"
        style={{
          backgroundImage: `
            radial-gradient(circle at 92% 45%, rgba(30, 95, 176, 0.45) 0%, rgba(59, 130, 246, 0.15) 35%, transparent 70%),
            linear-gradient(135deg, #070B14 0%, #0A1020 30%, #0D1B3A 70%, #070B14 100%)
          `,
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Faint thin diagonal light streak in lower-left area */}
        <div 
          className="absolute bottom-0 left-0 w-[20%] h-[15%] bg-gradient-to-tr from-cyan-500/5 to-transparent skew-x-12 blur-sm pointer-events-none"
          style={{ transform: 'rotate(15deg) translate(-20px, 30px)' }}
        />

        {/* 2. Scattered Hexagon tiles positioned absolutely via percentages */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Tile 1: Sparkles (AI) - (21%, 15%) */}
          <HexagonTile 
            icon={Sparkles} 
            left="21%" 
            top="15%" 
            opacityClass="opacity-30" 
            iconOpacity={0.4} 
            delay={0.1}
          />
          {/* Tile 2: Inbox - (12.5%, 33%) */}
          <HexagonTile 
            icon={Mail} 
            left="12.5%" 
            top="33%" 
            opacityClass="opacity-20" 
            iconOpacity={0.4} 
            delay={0.2}
          />
          {/* Tile 3: Contacts/People - (24%, 41%) */}
          <HexagonTile 
            icon={Users} 
            left="24%" 
            top="41%" 
            opacityClass="opacity-25" 
            iconOpacity={0.4} 
            delay={0.3}
          />
          {/* Tile 4: Contacts (brighter, blue-tinted) - (88.5%, 15%) */}
          <HexagonTile 
            icon={Users} 
            left="88.5%" 
            top="15%" 
            opacityClass="opacity-45" 
            iconOpacity={0.5} 
            blueTinted={true}
            delay={0.15}
          />
          {/* Tile 5: Hierarchy/Workflow nodes - (74%, 27%) */}
          <HexagonTile 
            icon={GitBranch} 
            left="74%" 
            top="27%" 
            opacityClass="opacity-35" 
            iconOpacity={0.45} 
            blueTinted={true}
            delay={0.25}
          />
          {/* Tile 6: Target/Campaign - (86%, 42%) */}
          <HexagonTile 
            icon={Target} 
            left="86%" 
            top="42%" 
            opacityClass="opacity-40" 
            iconOpacity={0.45} 
            blueTinted={true}
            delay={0.35}
          />
        </div>

        {/* 3. Center Glowing Ring + 4. Heading & Subtext */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-20 px-4 mt-[-40px]">
          {error ? (
            <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center mb-6 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse">
                <ShieldAlert size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Connection Failed</h2>
              <p className="text-gray-300 text-xs mb-4">
                Unable to sync information from the dummy API. Please check your network and retry.
              </p>
              <p className="text-red-400 text-xs font-semibold bg-red-950/20 px-3 py-2 rounded-lg border border-red-900/30">
                {error.message || 'Unknown network error'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* Ring Container (Vertical ~25% of height) */}
              <div className="relative flex items-center justify-center" style={{ width: '210px', height: '210px' }}>
                
                {/* Glow ring outer shadow duplicate */}
                <div className="absolute inset-[-15px] rounded-full bg-blue-500/10 blur-xl pointer-events-none" />

                {/* Outer spinning glow ring with gradient stroke (crescent segment bottom-left) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-transparent"
                  style={{
                    background: 'conic-gradient(from 180deg, #60A5FA 0%, #3B82F6 20%, transparent 60%, #3B82F6 90%, #60A5FA 100%)',
                    maskImage: 'radial-gradient(circle, transparent 65%, black 66%)',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 65%, black 66%)',
                  }}
                />

                {/* Center breathing core ring */}
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[196px] h-[196px] rounded-full bg-[#070B14]/90 border border-blue-500/20 flex items-center justify-center shadow-[inset_0_0_30px_rgba(37,99,235,0.3)]"
                >
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center text-center"
                  >
                    <Sparkles size={28} className="text-cyan-400 mb-1 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 font-extrabold">
                      BOXpad Sync
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Status Header (Starting ~46% of frame height) */}
              <div className="mt-10 text-center flex flex-col items-center select-text">
                <motion.h1
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-4xl font-extrabold text-white tracking-tight leading-none"
                  style={{ fontSize: '2.8rem' }}
                >
                  Extracting {getTabLabel(activeTab)} Info…
                </motion.h1>

                <motion.p
                  animate={{ opacity: [0.6, 0.85, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                  className="text-gray-400 text-sm mt-3 leading-relaxed max-w-[500px]"
                >
                  We are extracting information from the above honey combs to your system
                </motion.p>
              </div>
            </div>
          )}
        </div>

        {/* 5. Bottom "Peeking" Dashboard Card (Starts at ~62% of height, inset ~7% on sides) */}
        <div 
          className="mx-auto w-[86%] h-36 bg-white/75 rounded-t-[28px] border-t border-x border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden relative opacity-70 scale-98 origin-top select-none pointer-events-none"
        >
          {/* Subtle grab bar separator */}
          <div className="w-10 h-1 bg-gray-400/40 rounded-full mx-auto mt-3.5 mb-2.5" />
          
          {/* Dimmed & blurred preview of skeleton layout */}
          <div className="w-full h-full opacity-35 blur-[1.5px] scale-100 origin-top">
            <SkeletonDashboard />
          </div>
        </div>

      </div>
    </motion.div>
  )
}
export default LoadingOverlay
