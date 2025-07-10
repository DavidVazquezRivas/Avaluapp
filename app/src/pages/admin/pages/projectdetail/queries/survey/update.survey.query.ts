import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { SurveyRequest } from '@/models/survey.model'
import { updateSurvey } from '../../services/survey/update.surveys.service'
import Queries from '@/constants/queries.constants'

export default function updateSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, SurveyRequest> {
  return {
    mutationFn: (request: SurveyRequest) =>
      updateSurvey(request.id ?? 0, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getSurveys] })
    },
    onError: (error) => {
      console.error('Error updating survey:', error)
    },
  }
}
