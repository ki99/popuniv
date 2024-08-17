import { useEffect, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import clickAudio from '@/assets/audios/click.wav'
import mascot from '@/assets/images/mascot.png'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DEFAULT_GROUP } from '@/constants/group'
import { useUser } from '@/hooks/auth'
import { useClicks, useClicksMutation } from '@/hooks/click'
import { useGroups } from '@/hooks/group'
import { commaizeNumber } from '@/utils/numbers'

export default function Counter() {
  const { data: groups } = useGroups()
  const { data: user } = useUser()

  const [selectedId, setSelectedId] = useState<string>(String(DEFAULT_GROUP.id))

  const { data: clicks } = useClicks(Number(selectedId), user)

  const queryClient = useQueryClient()
  const { mutate: sendClicks } = useClicksMutation(queryClient)

  const [count, setCount] = useState(0)
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    if (user) {
      setSelectedId(String(user.university.id))
    }
  }, [user])

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

  const handleOpenAlert = () => {
    setOpenAlert(!openAlert)
  }

  const handleChange = (value: string) => {
    if (!user) {
      return handleOpenAlert()
    }
    setSelectedId(value)
  }
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1)
    new Audio(clickAudio).play()
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-full w-[300px] flex-col justify-around md:py-4">
        <Select onValueChange={handleChange} value={selectedId}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="대학교를 선택해주세요." />
          </SelectTrigger>
          <SelectContent>
            {groups?.map((group) => (
              <SelectItem key={group.value} value={String(group.value)}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

        <img
          src={mascot}
          alt="클릭할 캐릭터"
          onClick={handleClick}
          width="300"
          height="300"
        />
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              로그인 후 선택 가능합니다 ٩( ᐛ )و
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleOpenAlert}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
