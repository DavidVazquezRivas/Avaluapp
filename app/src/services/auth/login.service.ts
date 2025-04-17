import { apiEndpoints } from '@/constants/endpoints'
import { Credential } from '@/models/credential.model'
import axios from 'axios'

export const login = async (credential: Credential) => {
  const body = {
    username: credential.username,
    password: credential.password,
  }

  return axios.post(apiEndpoints.auth.login, body)
}
