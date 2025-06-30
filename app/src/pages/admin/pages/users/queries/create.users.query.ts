import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { createUser } from '../services/create.users.service'
import { AxiosResponse } from 'axios'
import { UserWithCredentials } from '@/models/user.model'
import Queries from '@/constants/queries.constants'

export default function createUsersQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, UserWithCredentials> {
  return {
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getUsers] })
    },
    onError: (error) => {
      console.error('Error creating user:', error)
    },
  }
}
