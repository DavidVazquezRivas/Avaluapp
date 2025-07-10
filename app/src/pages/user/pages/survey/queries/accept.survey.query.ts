import { MutationOptions, QueryClient } from '@tanstack/react-query'
import Queries from '@/constants/queries.constants'
import { acceptSurvey } from '../services/accept.survey.service'

export default function acceptSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await acceptSurvey(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getLeadSurveys] })
    },
    onError: (error) => {
      console.error('Error accepting survey:', error)
    },
  }
}
