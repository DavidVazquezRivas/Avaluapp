import { TabModel } from '@/models/tab.model'
import SurveyTab from '../components/tabs/SurveyTab'
import QuestionTab from '../components/tabs/QuestionTab'

export const getAdminProjectTabs = (id: number): TabModel[] => [
  {
    label: 'surveys',
    component: <SurveyTab id={id} />,
  },
  {
    label: 'questions',
    component: <QuestionTab id={id} />,
  },
]
