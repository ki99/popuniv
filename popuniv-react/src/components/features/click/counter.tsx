import { useEffect, useState } from 'react'

import Box from './box'
import { useQueryClient } from '@tanstack/react-query'

import clickAudio from '@/assets/audios/click.wav'
import { useUser } from '@/hooks/auth'
import { useClicks, useClicksMutation } from '@/hooks/click'
import { commaizeNumber } from '@/utils/numbers'

interface ClickCounterProps {
  selectedId: string
}

export default function ClickCounter({ selectedId }: ClickCounterProps) {
  const { data: user } = useUser()
  const { data: clicks } = useClicks(Number(selectedId), user)

  const queryClient = useQueryClient()
  const { mutate: sendClicks } = useClicksMutation(queryClient)

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1)
    new Audio(clickAudio).play()
  }

  useEffect(() => {
    const updateClicks = () => {
      if (count === 0) return
      sendClicks({ selectedId: Number(selectedId), clickCount: count })
      if (!user) {
        const value = count + (clicks?.userClickCount || 0)
        localStorage.setItem('click_count', String(value))
      }
      setCount(0)
    }

    const interval = setInterval(updateClicks, 500)
    return () => {
      clearInterval(interval)
    }
  }, [clicks?.userClickCount, count, selectedId, sendClicks, user])

  return (
    <>
      <div className="flex flex-col gap-4 text-center text-white">
        <div className="flex flex-col gap-2">
          <div className="font-semibold">전체 클릭 횟수</div>
          <div className="text-2xl font-extrabold slashed-zero lining-nums">
            {commaizeNumber(clicks?.totalClickCount || 0)}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">내 누적 클릭 횟수</div>
          <div className="text-2xl font-extrabold slashed-zero lining-nums">
            {commaizeNumber(clicks?.userClickCount || 0)}
          </div>
        </div>

        <div className="text-4xl font-extrabold slashed-zero lining-nums underline decoration-yellow-300 decoration-8">
          {commaizeNumber(count)}
        </div>
      </div>

      <Box onClick={handleClick} />
    </>
  )
}
