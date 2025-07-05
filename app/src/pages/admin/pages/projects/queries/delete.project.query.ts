import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { deleteProject } from '../services/delete.projects.service'
import Queries from '@/constants/queries.constants'

export default function deleteProjectQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await deleteProject(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getProjects] })
    },
    onError: (error) => {
      console.error('Error deleting project:', error)
    },
  }
}
