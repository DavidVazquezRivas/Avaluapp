import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { deleteUser } from '../services/delete.users.service'
import Queries from '@/constants/queries.constants'

export default function deleteUsersQueryOptions(
  queryClient: QueryClient
): MutationOptions<void, Error, number> {
  return {
    mutationFn: async (id: number) => {
      await deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getUsers] })
    },
    onError: (error) => {
      console.error('Error deleting user:', error)
    },
  }
}
