import type { MouseEventHandler } from 'react'

import mascot from '@/assets/images/mascot.png'

interface BoxProps {
  onClick?: MouseEventHandler
}

export default function Box({ onClick }: BoxProps) {
  return (
    <img
      src={mascot}
      alt="클릭할 캐릭터"
      onClick={onClick}
      className="h-[240px] w-[240px] sm:h-[300px] sm:w-[300px]"
    />
  )
}
