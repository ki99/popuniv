import { ReloadIcon } from '@radix-ui/react-icons'

import { type AsyncErrorFallbackProps } from '@/app/boundaries/async-error-fallback'
import { Button } from '@/components/ui/button'

export default function CounterErrorFallback({
  reset,
  message,
}: AsyncErrorFallbackProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1 className="xs:text-4xl font-dynapuff text-9xl">?</h1>
      {message ? <p>{message}</p> : <p>오류가 발생했습니다.</p>}

      {reset && (
        <Button variant="ghost" className="p-0" onClick={() => reset()}>
          <ReloadIcon />
        </Button>
      )}
    </div>
  )
}
