import { MutationOptions, QueryClient } from '@tanstack/react-query'
import Queries from '@/constants/queries.constants'
import { deleteSurvey } from '../../services/survey/delete.surveys.service'

export default function deleteSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await deleteSurvey(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getSurveys] })
    },
    onError: (error) => {
      console.error('Error deleting survey:', error)
    },
  }
}
