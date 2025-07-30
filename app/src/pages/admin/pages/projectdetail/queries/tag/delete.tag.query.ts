import { MutationOptions, QueryClient } from '@tanstack/react-query'
import Queries from '@/constants/queries.constants'
import { deleteTag } from '../../services/tag/delete.tag.service'

export default function deleteTagQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await deleteTag(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getTags] })
    },
    onError: (error) => {
      console.error('Error deleting tag:', error)
    },
  }
}
