import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getQuestion } from '../../services/question/get.question.service'

export default function getAllQuestionsQueryOptions(id: number) {
  return queryOptions({
    queryKey: [Queries.getQuestion, id],
    queryFn: () => getQuestion(id),
    select: (data) => data.data.data,
  })
}
