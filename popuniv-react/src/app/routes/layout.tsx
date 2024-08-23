import { type ReactNode } from 'react'

import { Background } from '@/components/layouts/background'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background className="z-10 p-6 text-center lg:p-8">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </Background>
    </>
  )
}
