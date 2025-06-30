import Queries from '@/constants/queries.constants'
import { refreshSession } from '@/utils/session.utils'
import { queryOptions } from '@tanstack/react-query'

export default function refreshSessionQueryOptions() {
  return queryOptions({
    queryKey: [Queries.refresh],
    queryFn: refreshSession,
    retry: 1,
  })
}
