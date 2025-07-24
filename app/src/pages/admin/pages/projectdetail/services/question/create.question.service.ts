import axios from 'axios'
import { QuestionRequest } from '@/models/question.model'
import { apiEndpoints } from '@/constants/endpoints'

export const createQuestion = async (request: QuestionRequest) => {
  return axios.post(apiEndpoints.questions.create, request)
}
