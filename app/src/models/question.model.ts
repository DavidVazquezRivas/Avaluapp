import { Project } from '@/models/project.model'
import { Tag } from './tag.model'

export enum QuestionType {
  SingleChoice = 'SINGLE_CHOICE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT',
  Numeric = 'NUMERIC',
  Rating = 'RATING',
  Date = 'DATE',
}

export interface QuestionOption {
  id: number
  questionId: number
  text: string
}

export interface Question {
  id: number
  name: string
  text: string
  questionType: QuestionType
  tags: Tag[]
  required: boolean
  maxLength?: number
  createdAt: Date
  project?: Project
  options?: QuestionOption[]
}

export interface QuestionRequest {
  id?: number
  name: string
  text: string
  questionType: QuestionType
  tags: number[]
  required: boolean
  maxLength?: number
  projectId: number
  options?: QuestionOptionRequest[]
}

export interface QuestionOptionRequest {
  id?: number
  text: string
}
