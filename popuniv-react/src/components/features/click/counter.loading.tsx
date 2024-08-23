import Box from './box'

import Spinner from '@/components/ui/spinner'

export default function CounterLoadingFallback() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="flex h-full items-center">
        <Spinner />
      </div>
      <Box />
    </div>
  )
}
