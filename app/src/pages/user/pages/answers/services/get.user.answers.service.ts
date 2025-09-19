import axios from 'axios'
import { apiEndpoints } from '@/constants/endpoints'

export const getUserAnswers = async () => {
  return axios.get(apiEndpoints.answers.getUserAnswers)
}
