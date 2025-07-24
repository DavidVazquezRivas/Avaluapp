import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getAllQuestions = async (projectId: number) => {
  return axios.get(apiEndpoints.questions.getAll(projectId))
}
