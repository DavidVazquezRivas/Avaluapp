import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'
import { SurveyRequest } from '@/models/survey.model'

export const updateSurvey = async (id: number, request: SurveyRequest) => {
  return axios.put(apiEndpoints.surveys.update(id), request)
}
