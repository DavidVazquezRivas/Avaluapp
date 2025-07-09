import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const deleteSurvey = async (id: number) => {
  return axios.delete(apiEndpoints.surveys.delete(id))
}
