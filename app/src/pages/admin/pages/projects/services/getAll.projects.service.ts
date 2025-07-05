import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getAllProjects = async () => {
  return axios.get(apiEndpoints.projects.getAll)
}
