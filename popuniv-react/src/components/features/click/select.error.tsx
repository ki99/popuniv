import AsyncErrorFallback, {
  type AsyncErrorFallbackProps,
} from '@/app/boundaries/async-error-fallback'

export default function SelectErrorFallback({
  reset,
  message,
}: AsyncErrorFallbackProps) {
  return AsyncErrorFallback({
    reset,
    message,
    className:
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm',
  })
}
