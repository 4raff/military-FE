import clsx from 'clsx'

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
  closeable?: boolean
}

export default function Alert({
  type = 'info',
  title,
  message,
  onClose,
  closeable = true,
}: AlertProps) {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const iconColor = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }

  return (
    <div className={clsx('border rounded-lg p-4', typeStyles[type])}>
      <div className="flex items-start gap-3">
        <div className={clsx('text-xl flex-shrink-0', iconColor[type])}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </div>
        <div className="flex-1">
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <p className="text-sm">{message}</p>
        </div>
        {closeable && onClose && (
          <button
            onClick={onClose}
            className="text-lg font-semibold opacity-50 hover:opacity-100 flex-shrink-0"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
