import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'
import { TagRequest } from '@/models/tag.model'

export const updateTag = async (id: number, request: TagRequest) => {
  return axios.put(apiEndpoints.tags.update(id), request)
}
