import { useQuery } from '@tanstack/react-query'
import {
  getProjectAnswers,
  getProjectAnswersBySurveys,
  getProjectAnswersByTags,
} from '../services/answer/get.project.answer.service'
import Queries from '@/constants/queries.constants'
import { ResultsFilters } from '@/models/results.model'

export function useProjectAnswers(id: number, filters: ResultsFilters) {
  return useQuery({
    queryKey: [Queries.getProjectAnswers, id, filters],
    enabled: true,
    queryFn: () => {
      switch (filters.filterType) {
        case 'surveys':
          return getProjectAnswersBySurveys(id, filters.surveyIds || [])
        case 'tags':
          return getProjectAnswersByTags(id, filters.tagIds || [])
        case 'none':
        default:
          return getProjectAnswers(id)
      }
    },
    select: (data) => data.data.data,
  })
}
