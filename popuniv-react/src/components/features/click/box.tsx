import type { MouseEventHandler } from 'react'

import mascotPng from '@/assets/images/mascot.png'
import mascotWebp from '@/assets/images/mascot.webp'

interface BoxProps {
  onClick?: MouseEventHandler
}

export default function Box({ onClick }: BoxProps) {
  return (
    <picture
      onClick={onClick}
      className="h-[240px] w-[240px] sm:h-[300px] sm:w-[300px]"
    >
      <source type="image/webp" srcSet={mascotWebp} />
      <img src={mascotPng} alt="클릭할 캐릭터" />
    </picture>
  )
}
