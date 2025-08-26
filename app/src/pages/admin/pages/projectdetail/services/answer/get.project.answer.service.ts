import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getProjectAnswers = async (projectId: number) => {
  return axios.get(apiEndpoints.answers.getProjectAnswers(projectId))
}

export const getProjectAnswersByTags = async (
  projectId: number,
  tagIds: number[]
) => {
  return axios.get(
    apiEndpoints.answers.getProjectAnswersByTags(projectId, tagIds)
  )
}

export const getProjectAnswersBySurveys = async (
  projectId: number,
  surveyIds: number[]
) => {
  return axios.get(
    apiEndpoints.answers.getProjectAnswersBySurveys(projectId, surveyIds)
  )
}
