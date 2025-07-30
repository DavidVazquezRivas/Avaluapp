import axios from 'axios'
import { apiEndpoints } from '@/constants/endpoints'
import { TagRequest } from '@/models/tag.model'

export const createTag = async (request: TagRequest) => {
  return axios.post(apiEndpoints.tags.create, request)
}
