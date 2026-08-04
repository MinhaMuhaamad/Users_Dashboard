import React from 'react'

interface AvatarProps {
  initials: string
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorMap: Record<string, string> = {
  OM: 'bg-purple-400',
  SW: 'bg-yellow-400',
  FT: 'bg-blue-400',
  GL: 'bg-orange-400',
  HE: 'bg-pink-400',
  IA: 'bg-red-400',
  JB: 'bg-green-400',
  KW: 'bg-indigo-400',
  LG: 'bg-cyan-400',
  MJ: 'bg-blue-500',
  JW: 'bg-green-500',
}

export function Avatar({
  initials,
  name,
  size = 'md',
  className = '',
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  const bgColor = colorMap[initials] || 'bg-gray-400'

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold ${className}`}
      title={name}
    >
      {initials}
    </div>
  )
}
