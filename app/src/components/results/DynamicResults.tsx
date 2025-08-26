import React from 'react'
import { Result } from '@/models/answer.model'
import { QuestionType } from '@/models/question.model'
import { DateResults } from './DateResults'
import { MultipleChoiceResults } from './MultipleChoiceResults'
import { NumericResults } from './NumericResults'
import { RatingResults } from './RatingResults'
import { SingleChoiceResults } from './SingleChoiceResults'
import { TextResults } from './TextResults'

interface DynamicResultsProps {
  result: Result
}

export const DynamicResults: React.FC<DynamicResultsProps> = ({ result }) => {
  const { question } = result

  switch (question.questionType) {
    case QuestionType.Date:
      return <DateResults result={result} />

    case QuestionType.MultipleChoice:
      return <MultipleChoiceResults result={result} />

    case QuestionType.Numeric:
      return <NumericResults result={result} />

    case QuestionType.Rating:
      return <RatingResults result={result} />

    case QuestionType.SingleChoice:
      return <SingleChoiceResults result={result} />

    case QuestionType.Text:
      return <TextResults result={result} />

    default:
      return null
  }
}
