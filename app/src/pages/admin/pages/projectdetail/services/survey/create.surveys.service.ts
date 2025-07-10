import axios from 'axios'
import { SurveyRequest } from '@/models/survey.model'
import { apiEndpoints } from '@/constants/endpoints'

export const createSurvey = async (request: SurveyRequest) => {
  return axios.post(apiEndpoints.surveys.create, request)
}
