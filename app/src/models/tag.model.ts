import { Question } from './question.model'

export interface Tag {
  id: number
  name: string
  color: string
  projectId: number
  questions: Question[]
}

export interface TagRequest {
  id?: number
  name: string
  color: string
  projectId: number
  questionIds: number[]
}
