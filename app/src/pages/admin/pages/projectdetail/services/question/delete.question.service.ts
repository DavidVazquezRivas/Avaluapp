import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const deleteQuestion = async (id: number) => {
  return axios.delete(apiEndpoints.questions.delete(id))
}
