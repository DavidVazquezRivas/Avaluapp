import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getUserAnswers } from '../services/get.user.answers.service'

export default function getUserAnswersQueryOptions(enabled: boolean = false) {
  return queryOptions({
    queryKey: [Queries.getUserAnswers],
    queryFn: () => getUserAnswers(),
    select: (data) => data.data.data,
    enabled,
  })
}
