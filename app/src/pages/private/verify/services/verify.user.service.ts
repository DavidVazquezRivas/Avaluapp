import axios from 'axios'
import { apiEndpoints } from '@/constants/endpoints'
import { VerifyRequest } from '@/models/user.model'

export const verifyUser = async (request: VerifyRequest) => {
  return axios.put(apiEndpoints.users.verify, request)
}
