import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export interface AsyncErrorFallbackProps {
  reset?: VoidFunction
  message?: string
  className?: string
}

export default function AsyncErrorFallback({
  reset,
  message,
  className,
}: AsyncErrorFallbackProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-full items-center justify-center gap-2',
        className,
      )}
    >
      <p>{message || '오류가 발생했습니다.'}</p>

      {reset && (
        <Button variant="ghost" className="p-0" onClick={() => reset()}>
          <ReloadIcon />
        </Button>
      )}
    </div>
  )
}
