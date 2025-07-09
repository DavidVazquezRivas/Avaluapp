import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Queries from '@/constants/queries.constants'
import { SurveyRequest } from '../../models/survey.model'
import { updateSurvey } from '../../services/survey/update.surveys.service'

export default function updateSurveyQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, SurveyRequest> {
  return {
    mutationFn: (survey: SurveyRequest) =>
      updateSurvey(survey.id as number, {
        name: survey.name,
        projectId: survey.projectId,
        leadId: survey.leadId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getSurveys] })
    },
    onError: (error) => {
      console.error('Error updating survey:', error)
    },
  }
}
