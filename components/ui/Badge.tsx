import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gray' | 'blue' | 'red' | 'green'
  className?: string
}

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  const variantClasses = {
    gray: 'bg-gray-100 text-gray-600',
    blue: 'bg-blue-50 text-blue-600 border border-blue-200',
    red: 'bg-red-50 text-red-600 border border-red-200',
    green: 'bg-green-50 text-green-600 border border-green-200',
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full select-none ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
