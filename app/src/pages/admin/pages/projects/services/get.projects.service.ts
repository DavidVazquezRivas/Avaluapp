import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getProject = async (id: number) => {
  return axios.get(apiEndpoints.projects.get(id))
}
