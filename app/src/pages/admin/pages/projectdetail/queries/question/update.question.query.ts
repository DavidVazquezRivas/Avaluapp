import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { updateQuestion } from '../../services/question/update.question.service'
import Queries from '@/constants/queries.constants'
import { QuestionRequest } from '@/models/question.model'

export default function updateQuestionQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, QuestionRequest> {
  return {
    mutationFn: (request: QuestionRequest) =>
      updateQuestion(request.id ?? 0, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getQuestions] })
    },
    onError: (error) => {
      console.error('Error updating question:', error)
    },
  }
}
