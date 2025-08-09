import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getSurveyQuestions = async (surveyCode: string) => {
  return axios.get(apiEndpoints.public.getQuestions(surveyCode))
}
