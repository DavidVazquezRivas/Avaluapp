import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const deleteProject = async (id: number) => {
  return axios.delete(apiEndpoints.projects.delete(id))
}
