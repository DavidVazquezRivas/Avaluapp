import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { SurveyRequest } from '../../models/survey.model'
import { updateSurvey } from '../../services/survey/update.surveys.service'
import Queries from '@/constants/queries.constants'

export default function updateSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, SurveyRequest> {
  return {
    mutationFn: (variables: SurveyRequest) =>
      updateSurvey(variables.id ?? 0, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getSurveys] })
    },
    onError: (error) => {
      console.error('Error creating survey:', error)
    },
  }
}
