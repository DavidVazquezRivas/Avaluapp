import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getAllLeadSurveys } from '../services/getAllLead.surveys.service'

export default function getAllLeadSurveysQueryOptions() {
  return queryOptions({
    queryKey: [Queries.getLeadSurveys],
    queryFn: () => getAllLeadSurveys(),
    select: (data) => data.data.data,
  })
}
