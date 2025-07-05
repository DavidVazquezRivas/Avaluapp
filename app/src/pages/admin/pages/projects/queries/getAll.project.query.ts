import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getAllProjects } from '../services/getAll.projects.service'

export default function getAllProjectsQueryOptions() {
  return queryOptions({
    queryKey: [Queries.getProjects],
    queryFn: getAllProjects,
    select: (data) => data.data.data,
  })
}
