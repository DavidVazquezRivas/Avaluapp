import axios from 'axios'
import { apiEndpoints } from '@/constants/endpoints'

export const getAllLeadSurveys = async () => {
  return axios.get(apiEndpoints.surveys.getAllLead)
}
