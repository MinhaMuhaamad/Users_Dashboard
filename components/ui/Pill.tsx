import React from 'react'

interface PillProps {
  children: React.ReactNode
  variant?: 'outline' | 'filled'
  color?: 'blue' | 'gray' | 'yellow'
  className?: string
}

export function Pill({ children, variant = 'filled', color = 'gray', className = '' }: PillProps) {
  const baseClasses = 'inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full select-none transition-colors'
  
  const styles = {
    filled: {
      gray: 'bg-gray-100 text-gray-500',
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-amber-100 text-amber-800',
    },
    outline: {
      gray: 'border border-gray-300 text-gray-600 bg-transparent',
      blue: 'border border-blue-500 text-blue-600 bg-transparent',
      yellow: 'border border-amber-500 text-amber-600 bg-transparent',
    }
  }

  return (
    <div className={`${baseClasses} ${styles[variant][color]} ${className}`}>
      {children}
    </div>
  )
}
