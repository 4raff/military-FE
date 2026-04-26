interface LoadingProps {
  fullScreen?: boolean
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Loading({
  fullScreen = false,
  message = 'Loading...',
  size = 'md',
}: LoadingProps) {
  const spinnerSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className={`${spinnerSizes[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`} />
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
      </div>
    )
  }

  return <div className="flex justify-center items-center p-8">{spinner}</div>
}
