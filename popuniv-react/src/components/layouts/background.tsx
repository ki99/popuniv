import { type ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface BackgroundProps {
  url: string
  className?: string
  children: ReactNode
}

export const Background = ({ url, className, children }: BackgroundProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
      }}
      className={cn('h-dvh w-dvw bg-cover bg-center bg-no-repeat', className)}
    >
      {children}
    </div>
  )
}
