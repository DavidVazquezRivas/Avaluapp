import { QuestionType, Question } from '@/models/question.model'
import {
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  TextQuestion,
  NumericQuestion,
  RatingQuestion,
  DateQuestion,
} from './index'

interface QuestionComponentProps {
  question: Question
  id?: string
}

export default function QuestionComponent({
  question,
  id = `${question.id}`,
}: QuestionComponentProps) {
  const baseProps = {
    id,
    text: question.text,
    required: question.required,
  }

  switch (question.questionType) {
    case QuestionType.SingleChoice:
      return (
        <SingleChoiceQuestion {...baseProps} options={question.options || []} />
      )

    case QuestionType.MultipleChoice:
      return (
        <MultipleChoiceQuestion
          {...baseProps}
          options={question.options || []}
        />
      )

    case QuestionType.Text:
      return (
        <TextQuestion
          {...baseProps}
          maxLength={question.maxLength}
          multiline={true}
        />
      )

    case QuestionType.Numeric:
      return <NumericQuestion {...baseProps} />

    case QuestionType.Rating:
      return <RatingQuestion {...baseProps} max={5} precision={1} />

    case QuestionType.Date:
      return <DateQuestion {...baseProps} />

    default:
      return null
  }
}
