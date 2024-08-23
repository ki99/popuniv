import { QueryCache, type QueryClientConfig } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'

const handleError = (error: Error) => {
  toast({
    variant: 'destructive',
    title: error.message || '문제가 발생하였습니다 ( ´△｀) 다시 시도해주세요',
  })
}

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60,
      throwOnError: true,
    },
    mutations: {
      onError: handleError,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
}
