import Queries from '@/constants/queries.constants'
import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { createQuestion } from '../../services/question/create.question.service'
import { QuestionRequest } from '@/models/question.model'

export default function createQuestionQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, QuestionRequest> {
  return {
    mutationFn: (request: QuestionRequest) => createQuestion(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getQuestions] })
    },
    onError: (error) => {
      console.error('Error creating question:', error)
    },
  }
}
