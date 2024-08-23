import { type ReactNode } from 'react'

import backgroundJpeg from '@/assets/images/background.jpeg'
import backgroundWebp from '@/assets/images/background.webp'
import { cn } from '@/utils/cn'
import { supportFormatWebp } from '@/utils/detection'

interface BackgroundProps {
  url?: string
  className?: string
  children: ReactNode
}

export const Background = ({
  url = supportFormatWebp() ? backgroundWebp : backgroundJpeg,
  className,
  children,
}: BackgroundProps) => {
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
