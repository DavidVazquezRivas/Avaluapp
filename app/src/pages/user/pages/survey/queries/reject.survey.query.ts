import { MutationOptions, QueryClient } from '@tanstack/react-query'
import Queries from '@/constants/queries.constants'
import { rejectSurvey } from '../services/reject.survey.service'

export default function rejectSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await rejectSurvey(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getLeadSurveys] })
    },
    onError: (error) => {
      console.error('Error rejecting survey:', error)
    },
  }
}
