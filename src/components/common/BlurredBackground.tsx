import type { ReactNode } from 'react'

interface BlurredBackgroundProps {
  blurAmount?: number
  overlayOpacity?: number
  children?: ReactNode
}

export default function BlurredBackground({
  blurAmount = 8,
  overlayOpacity = 0.3,
  children,
}: BlurredBackgroundProps) {
  // Correct way to import static assets in Vite
  const backgroundImage = new URL('../../assets/background.png', import.meta.url).href

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Blurred Background Image - Military Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: `blur(${blurAmount}px)`,
          zIndex: -10,
          pointerEvents: 'none',
        }}
      />

      {/* Dark Overlay for Better Readability */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: -9,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      {children}
    </div>
  )
}
