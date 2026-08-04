import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { HoneycombIcon } from '../layout/HoneycombIcon'
import { loadingConfig } from '@/lib/loadingConfig'

interface HexagonFlyIconProps {
  startRect: DOMRect | null
  endRect: DOMRect | null
  icon: LucideIcon
  onComplete: () => void
}

export function HexagonFlyIcon({ startRect, endRect, icon, onComplete }: HexagonFlyIconProps) {
  if (!startRect || !endRect) {
    // If rects are not available, immediately fire onComplete
    React.useEffect(() => {
      onComplete()
    }, [onComplete])
    return null
  }

  // Define initial positions relative to the viewport (fixed)
  const initialX = startRect.left + startRect.width / 2
  const initialY = startRect.top + startRect.height / 2
  const targetX = endRect.left + endRect.width / 2
  const targetY = endRect.top + endRect.height / 2

  // The delta translations
  const deltaX = targetX - initialX
  const deltaY = targetY - initialY

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div
        initial={{ 
          x: initialX, 
          y: initialY, 
          scale: 1, 
          opacity: 1,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ 
          x: targetX, 
          y: targetY, 
          scale: 0.45, 
          opacity: [1, 0.9, 0] 
        }}
        transition={{ 
          duration: loadingConfig.flyDuration / 1000, 
          ease: [0.42, 0, 0.58, 1] // ease-in-out
        }}
        onAnimationComplete={onComplete}
        className="fixed"
      >
        {/* Render a highlighted glowing HoneycombIcon */}
        <div className="shadow-[0_0_25px_rgba(37,99,235,0.6)] rounded-full">
          <HoneycombIcon icon={icon} isSelected={true} size="md" />
        </div>
      </motion.div>
    </div>
  )
}
export default HexagonFlyIcon
