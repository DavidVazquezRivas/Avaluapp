import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getAllQuestions } from '../../services/question/getAll.question.service'

export default function getAllQuestionsQueryOptions(projectId: number) {
  return queryOptions({
    queryKey: [Queries.getQuestions, projectId],
    queryFn: () => getAllQuestions(projectId),
    select: (data) => data.data.data,
  })
}
