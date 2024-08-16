import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import LogoutButtonAlert from '../../../components/features/user/logout-button-alert'

import background from '@/assets/images/background.jpeg'
import { Background } from '@/components/layouts/background'
import { useUser } from '@/hooks/auth'

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { data: user } = useUser()

  return (
    <>
      <Background url={background} className="z-10 flex flex-col sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="w-fit">
            <span className="font-dynapuff text-3xl font-bold text-black">
              POPUNIV
            </span>
          </Link>

          {user ? (
            <LogoutButtonAlert nickname={user.nickname} />
          ) : (
            <Link to="/login" className="text-sm font-medium">
              로그인
            </Link>
          )}
        </div>

        <div className="mt-8 flex flex-1">{children}</div>
      </Background>
    </>
  )
}