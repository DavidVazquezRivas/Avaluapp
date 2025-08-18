import { Question } from './question.model'

export interface SubmitAnswer {
  questionId: string
  answer: string
}

export interface BaseAnswer {
  value: string | number | Array<string | number>
  answeredAt: Date | string
}

export interface Result {
  answers: BaseAnswer[]
  question: Question
}
