import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

// Interface for the user dashboard API response
export interface UserDashboardStats {
  pendingSurveys: number
  acceptedSurveys: number
  totalResponses: number
  totalProjects: number
}

// Service that calls the dashboard endpoint
export const getUserDashboardStats = async () => {
  return axios.get(apiEndpoints.dashboards.user)
}
