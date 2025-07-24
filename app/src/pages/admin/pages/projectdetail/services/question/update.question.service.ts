import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'
import { QuestionRequest } from '@/models/question.model'

export const updateQuestion = async (id: number, request: QuestionRequest) => {
  return axios.put(apiEndpoints.questions.update(id), request)
}
