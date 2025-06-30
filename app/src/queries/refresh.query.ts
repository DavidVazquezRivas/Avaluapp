import { refreshSession } from '@/utils/session.utils'
import { queryOptions } from '@tanstack/react-query'

export default function refreshSessionQueryOptions() {
  return queryOptions({
    queryKey: ['refresh'],
    queryFn: refreshSession,
    retry: 1,
  })
}
