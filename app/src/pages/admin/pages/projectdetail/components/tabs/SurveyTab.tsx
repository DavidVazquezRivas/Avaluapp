import SurveyGrid from '../grids/SurveyGrid'

interface SurveyTabProps {
  id: number
}

export const SurveyTab: React.FC<SurveyTabProps> = ({ id }) => {
  return <SurveyGrid projectId={id} />
}

export default SurveyTab
