export interface SubmitAnswer {
  questionId: string
  answer: string
}

export interface BaseAnswer {
  value: string | number
  answeredAt: Date | string
}
