import type { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  padding?: 'sm' | 'md' | 'lg'
  border?: boolean
  shadow?: boolean
}

export default function Card({
  children,
  className,
  title,
  subtitle,
  padding = 'md',
  border = true,
  shadow = true,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-lg',
        border && 'border border-gray-200',
        shadow && 'shadow-sm',
        paddingClasses[padding],
        className,
      )}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
