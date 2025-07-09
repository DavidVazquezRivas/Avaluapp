import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getAllSurveys = async (projectId: number) => {
  return axios.get(apiEndpoints.surveys.getAll(projectId))
}
