import React from 'react'
import { LucideIcon } from 'lucide-react'

interface HoneycombIconProps {
  icon: LucideIcon
  isSelected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  iconClassName?: string
}

export function HoneycombIcon({
  icon: Icon,
  isSelected = false,
  onClick,
  size = 'md',
  className = '',
  iconClassName = '',
}: HoneycombIconProps) {
  // Dimensions for hexagon
  const sizeMap = {
    sm: { box: 'w-8 h-8', icon: 14, poly: '50,5 89,28 89,72 50,95 11,72 11,28' },
    md: { box: 'w-10 h-10', icon: 18, poly: '50,5 89,28 89,72 50,95 11,72 11,28' },
    lg: { box: 'w-14 h-14', icon: 24, poly: '50,5 89,28 89,72 50,95 11,72 11,28' },
    xl: { box: 'w-20 h-20', icon: 32, poly: '50,5 89,28 89,72 50,95 11,72 11,28' },
  }

  const current = sizeMap[size]

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none group transition-transform duration-200 ease-out active:scale-95 ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      } ${current.box} ${className}`}
    >
      {/* Hexagon SVG Background */}
      <svg
        viewBox="0 0 100 100"
        className={`absolute inset-0 w-full h-full drop-shadow-sm transition-all duration-300 ${
          isSelected 
            ? 'scale-100 opacity-100' 
            : 'scale-90 opacity-60 group-hover:scale-100 group-hover:opacity-90'
        }`}
      >
        <defs>
          <linearGradient id="honeycomb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" /> {/* Blue */}
            <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
          </linearGradient>
        </defs>
        <polygon
          points={current.poly}
          fill={isSelected ? 'url(#honeycomb-grad)' : 'rgba(15, 23, 42, 0.08)'}
          stroke={isSelected ? 'none' : 'rgba(15, 23, 42, 0.15)'}
          strokeWidth={isSelected ? '0' : '2'}
          className="transition-all duration-300"
        />
      </svg>

      {/* Floating Icon inside */}
      <div className={`relative z-10 transition-colors duration-300 ${
        isSelected ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'
      }`}>
        <Icon size={current.icon} className={iconClassName} />
      </div>
    </div>
  )
}
export default HoneycombIcon
