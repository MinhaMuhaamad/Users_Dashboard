import React from 'react'
import { getAvatarColor } from '@/lib/api'

interface AvatarProps {
  initials: string
  name: string
  userId?: string | number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({
  initials,
  name,
  userId,
  size = 'md',
  className = '',
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-semibold',
  }

  // Derive a color from the initials to keep it consistent per user, or use userId if provided
  const hashString = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash)
  }

  const colorIndex = userId !== undefined 
    ? (typeof userId === 'number' ? userId : hashString(String(userId)))
    : hashString(initials)

  const bgClass = getAvatarColor(colorIndex)

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold select-none shrink-0 ${sizeClasses[size]} ${bgClass} ${className}`}
      title={name}
    >
      {initials}
    </div>
  )
}
