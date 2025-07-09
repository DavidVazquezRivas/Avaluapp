import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getAllSurveys } from '../../services/survey/getAll.surveys.service'

export default function getAllSurveysQueryOptions(projectId: number) {
  return queryOptions({
    queryKey: [Queries.getSurveys, projectId],
    queryFn: () => getAllSurveys(projectId),
    select: (data) => data.data.data,
  })
}
