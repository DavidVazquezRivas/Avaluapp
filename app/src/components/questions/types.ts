import { QuestionOption } from '@/models/question.model'

export interface BaseQuestionProps {
  id: string
  text: string
  required?: boolean
  error?: string
  helperText?: string
}

export interface OptionBasedQuestionProps extends BaseQuestionProps {
  options: QuestionOption[]
}

export interface TextQuestionProps extends BaseQuestionProps {
  maxLength?: number
  multiline?: boolean
}

export interface NumericQuestionProps extends BaseQuestionProps {
  min?: number
  max?: number
}

export interface RatingQuestionProps extends BaseQuestionProps {
  max?: number
  precision?: number
}

export interface DateQuestionProps extends BaseQuestionProps {
  minDate?: Date
  maxDate?: Date
}
