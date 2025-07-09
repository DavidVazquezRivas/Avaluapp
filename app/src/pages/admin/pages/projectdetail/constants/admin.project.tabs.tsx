import { TabModel } from '@/models/tab.model'
import { SurveyTab } from '../components/tabs/SurveyTab'

export const getAdminProjectTabs = (id: number): TabModel[] => [
  {
    label: 'surveys',
    component: <SurveyTab id={id} />,
  },
  {
    label: 'surveys', // Duplicate for demonstration, can be replaced with other tabs
    component: <SurveyTab id={id} />,
  },
]
