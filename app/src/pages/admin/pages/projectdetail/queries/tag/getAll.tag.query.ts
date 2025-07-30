import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getAllTags } from '../../services/tag/getAll.tag.service'

export default function getAllTagsQueryOptions(projectId: number) {
  return queryOptions({
    queryKey: [Queries.getTags, projectId],
    queryFn: () => getAllTags(projectId),
    select: (data) => data.data.data,
  })
}
