import { TabModel } from '@/models/tab.model'
import SurveyTab from '../components/tabs/SurveyTab'
import QuestionTab from '../components/tabs/QuestionTab'
import TagTab from '../components/tabs/TagTab'
import ResultTab from '../components/tabs/ResultTab'

export const getAdminProjectTabs = (id: number): TabModel[] => [
  {
    label: 'surveys',
    component: <SurveyTab id={id} />,
  },
  {
    label: 'questions',
    component: <QuestionTab id={id} />,
  },
  {
    label: 'tags',
    component: <TagTab id={id} />,
  },
  {
    label: 'results',
    component: <ResultTab projectId={id} />,
  },
]
