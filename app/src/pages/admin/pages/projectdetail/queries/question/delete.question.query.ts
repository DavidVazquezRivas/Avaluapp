import { MutationOptions, QueryClient } from '@tanstack/react-query'
import Queries from '@/constants/queries.constants'
import { deleteQuestion } from '../../services/question/delete.question.service'

export default function deleteQuestionQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await deleteQuestion(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getQuestions] })
    },
    onError: (error) => {
      console.error('Error deleting question:', error)
    },
  }
}
