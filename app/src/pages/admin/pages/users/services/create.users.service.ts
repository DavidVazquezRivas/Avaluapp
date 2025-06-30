import { apiEndpoints } from '@/constants/endpoints'
import { UserWithCredentials } from '@/models/user.model'
import axios from 'axios'

export const createUser = async (user: UserWithCredentials) => {
  return axios.post(apiEndpoints.users.create, user)
}
