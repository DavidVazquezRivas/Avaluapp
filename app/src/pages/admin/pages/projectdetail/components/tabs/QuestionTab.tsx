import QuestionGrid from '../grids/QuestionGrid'

interface SurveyTabProps {
  id: number
}

export const QuestionTab: React.FC<SurveyTabProps> = ({ id }) => {
  return <QuestionGrid projectId={id} />
}

export default QuestionTab
