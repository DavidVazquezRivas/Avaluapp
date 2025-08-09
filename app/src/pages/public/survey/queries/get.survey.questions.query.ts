import Queries from '@/constants/queries.constants'
import { queryOptions } from '@tanstack/react-query'
import { getSurveyQuestions } from '../services/get.survey.questions.service'

export default function getSurveyQuestionsQueryOptions(surveyCode: string) {
  return queryOptions({
    queryKey: [Queries.getSurveyQuestions, surveyCode],
    queryFn: () => getSurveyQuestions(surveyCode),
    select: (data) => data.data.data,
  })
}
