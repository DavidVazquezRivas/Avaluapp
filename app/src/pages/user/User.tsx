import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { UserRoutes } from '@/constants/routes'
import { Navigate, Route } from 'react-router-dom'
import { lazy } from 'react'

const UserDashboard = lazy(() => import('./pages/dashboard/UserDashboard'))
const SurveyPage = lazy(() => import('./pages/survey/SurveyPage'))

export const User = () => {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={UserRoutes.Dashboard} />} />
      <Route path={UserRoutes.Dashboard} element={<UserDashboard />} />
      <Route path={UserRoutes.Survey} element={<SurveyPage />} />
    </RoutesWithNotFound>
  )
}

export default User
