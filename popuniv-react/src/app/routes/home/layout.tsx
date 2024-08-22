import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import background from '@/assets/images/background.jpeg'
import LogoutButtonAlert from '@/components/features/user/logout-button-alert'
import { Background } from '@/components/layouts/background'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/auth'

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUser()

  return (
    <>
      <Background
        url={background}
        className="z-10 flex flex-col gap-8 p-4 lg:p-8"
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="w-fit">
            <span className="font-dynapuff text-3xl font-bold text-black">
              POPUNIV
            </span>
          </Link>

          {isLoading ? (
            <Skeleton className="w-16">&nbsp;</Skeleton>
          ) : user ? (
            <LogoutButtonAlert nickname={user.nickname} />
          ) : (
            <Link to="/login" className="text-sm font-medium">
              로그인
            </Link>
          )}
        </div>

        <div className="flex-1">{children}</div>
      </Background>
    </>
  )
}
