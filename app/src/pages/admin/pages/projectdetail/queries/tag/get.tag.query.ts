import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getTag } from '../../services/tag/get.tag.service'

export default function getTagQueryOptions(id: number) {
  return queryOptions({
    queryKey: [Queries.getTag, id],
    queryFn: () => getTag(id),
    select: (data) => data.data.data,
  })
}
