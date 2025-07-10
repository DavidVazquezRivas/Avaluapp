import axios from 'axios'
import { apiEndpoints } from '@/constants/endpoints'

export const acceptSurvey = async (id: number) => {
  return axios.post(apiEndpoints.surveys.accept(id))
}
