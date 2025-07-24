import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getQuestion = async (id: number) => {
  return axios.get(apiEndpoints.questions.get(id))
}
