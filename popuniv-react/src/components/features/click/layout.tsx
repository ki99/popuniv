import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex h-full w-[240px] flex-col justify-between gap-2 py-4 sm:w-[300px] sm:py-6">
        {children}
      </div>
    </div>
  )
}
