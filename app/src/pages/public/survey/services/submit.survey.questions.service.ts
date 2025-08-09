import { apiEndpoints } from '@/constants/endpoints'
import { SubmitAnswer } from '@/models/answer.model'
import axios from 'axios'

export const submitSurveyAnswers = async (
  surveyCode: string,
  answers: SubmitAnswer[]
) => {
  return axios.post(apiEndpoints.public.submitAnswers(surveyCode), answers)
}
