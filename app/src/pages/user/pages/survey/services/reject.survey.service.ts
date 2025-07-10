import axios from 'axios'
import { apiEndpoints } from '@/constants/endpoints'

export const rejectSurvey = async (id: number) => {
  return axios.post(apiEndpoints.surveys.reject(id))
}
