import { User } from '@/models/user.model'
import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { updateUser } from '../services/update.users.service'
import Queries from '@/constants/queries.constants'

export default function updateUsersQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, User> {
  return {
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getUsers] })
    },
    onError: (error) => {
      console.error('Error updating user:', error)
    },
  }
}
