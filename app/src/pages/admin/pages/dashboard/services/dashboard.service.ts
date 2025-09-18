import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

// Service that calls the dashboard endpoint
export const getDashboardStats = async () => {
  return axios.get(apiEndpoints.dashboards.admin)
}
