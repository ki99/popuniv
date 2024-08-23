import AsyncErrorFallback, {
  type AsyncErrorFallbackProps,
} from '@/app/boundaries/async-error-fallback'

export default function DrawerTriggerErrorFallback({
  reset,
  message,
}: AsyncErrorFallbackProps) {
  return AsyncErrorFallback({
    reset,
    message,
    className:
      'fixed bottom-0 left-0 h-12 w-full rounded-t-[10px] border bg-background',
  })
}
