import { apiEndpoints } from '@/constants/endpoints'
import { User } from '@/models/user.model'
import axios from 'axios'

export const updateUser = async (user: User) => {
  const { id, ...data } = user
  return axios.put(apiEndpoints.users.update(id), data)
}
