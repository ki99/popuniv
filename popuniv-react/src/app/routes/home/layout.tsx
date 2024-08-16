import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import background from '@/assets/images/background.jpeg'
import { Background } from '@/components/layouts/background'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background url={background} className="z-10 flex flex-col sm:p-6 lg:p-8">
        <Link to="/" className="w-fit">
          <span className="font-dynapuff text-3xl font-bold text-black">
            POPUNIV
          </span>
        </Link>
        <div className="mt-8 flex flex-1">{children}</div>
      </Background>
    </>
  )
}
