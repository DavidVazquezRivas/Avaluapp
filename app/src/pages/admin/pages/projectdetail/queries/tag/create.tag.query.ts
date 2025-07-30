import Queries from '@/constants/queries.constants'
import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { createTag } from '../../services/tag/create.tag.service'
import { TagRequest } from '@/models/tag.model'

export default function createTagQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, TagRequest> {
  return {
    mutationFn: (request: TagRequest) => createTag(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getTags] })
    },
    onError: (error) => {
      console.error('Error creating tag:', error)
    },
  }
}
