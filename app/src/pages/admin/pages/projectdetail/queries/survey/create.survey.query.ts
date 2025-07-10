import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { SurveyRequest } from '@/models/survey.model'
import Queries from '@/constants/queries.constants'
import { createSurvey } from '../../services/survey/create.surveys.service'

export default function createSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, SurveyRequest> {
  return {
    mutationFn: (request: SurveyRequest) => createSurvey(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getSurveys] })
    },
    onError: (error) => {
      console.error('Error creating survey:', error)
    },
  }
}
