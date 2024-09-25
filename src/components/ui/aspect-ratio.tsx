import React from 'react'

interface AspectRatioProps {
  ratio: number
  children: React.ReactNode
  className?: string
}

export default function AspectRatio({
  ratio,
  children,
  className,
}: AspectRatioProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${((1 / ratio) * 100).toString()}%`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
