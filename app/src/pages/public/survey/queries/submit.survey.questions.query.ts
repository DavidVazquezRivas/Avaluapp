import { SubmitAnswer } from '@/models/answer.model'
import { MutationOptions } from '@tanstack/react-query'
import { submitSurveyAnswers } from '../services/submit.survey.questions.service'
import { NavigateFunction } from 'react-router-dom'
import { PublicRoutes } from '@/constants/routes'

export default function submitSurveyQuestionsQueryOptions(
  surveyCode: string,
  navigate: NavigateFunction
): MutationOptions<void, Error, SubmitAnswer[]> {
  return {
    mutationFn: async (answers: SubmitAnswer[]) => {
      await submitSurveyAnswers(surveyCode, answers)
    },
    onSuccess: () => {
      navigate(PublicRoutes.Sent, { replace: true })
    },
    onError: (error) => {
      console.error('Error submitting survey answers:', error)
    },
  }
}
