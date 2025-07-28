import { Project } from '@/pages/admin/pages/projects/models/project.model'

export enum QuestionType {
  SingleChoice = 'SINGLE_CHOICE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT',
  Numeric = 'NUMERIC',
  Rating = 'RATING',
  Date = 'DATE',
  YesNo = 'YES_NO',
}

export interface QuestionOption {
  id: number
  questionId: number
  text: string
  correct: boolean
}

export interface Question {
  id: number
  text: string
  questionType: QuestionType
  required: boolean
  maxLength?: number
  createdAt: Date
  project?: Project
  options?: QuestionOption[]
}

export interface QuestionRequest {
  id?: number
  text: string
  questionType: QuestionType
  required: boolean
  maxLength?: number
  projectId: number
  options?: QuestionOptionRequest[]
}

export interface QuestionOptionRequest {
  id?: number
  text: string
  correct: boolean
}
