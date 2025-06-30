import { queryOptions } from '@tanstack/react-query'
import { getUsers } from '../services/get.users.service'
import Queries from '@/constants/queries.constants'

export default function getUsersQueryOptions() {
  return queryOptions({
    queryKey: [Queries.getUsers],
    queryFn: getUsers,
    select: (data) => data.data.data,
  })
}
