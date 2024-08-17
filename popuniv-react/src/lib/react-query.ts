import { QueryCache } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  toast({
    variant: 'destructive',
    title: error.message || '문제가 발생하였습니다 ( ´△｀) 다시 시도해주세요',
  })
}

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      onError: handleError,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
}
