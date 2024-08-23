import { Link } from 'react-router-dom'

import { Background } from '@/components/layouts/background'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

export default function AuthLayout({ title, children }: LayoutProps) {
  return (
    <>
      <title>{`${title}`}</title>
      <Background className="z-10 flex items-center p-4 lg:p-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col justify-center gap-4 bg-white bg-opacity-90 px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <Link to="/" className="w-fit">
              <span className="font-dynapuff text-3xl font-bold text-black">
                POPUNIV
              </span>
            </Link>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {children}
          </div>
        </div>
      </Background>
    </>
  )
}
