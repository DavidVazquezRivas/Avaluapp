import Queries from '@/constants/queries.constants'
import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { updateTag } from '../../services/tag/update.tag.service'
import { TagRequest } from '@/models/tag.model'

export default function updateTagQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, TagRequest> {
  return {
    mutationFn: (request: TagRequest) => updateTag(request.id ?? 0, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getTags] })
    },
    onError: (error) => {
      console.error('Error updating tag:', error)
    },
  }
}
