import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { UserRoutes } from '@/constants/routes'
import { Navigate, Route } from 'react-router-dom'
import { lazy } from 'react'

const UserDashboard = lazy(() => import('./pages/UserDashboard'))

export const User = () => {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={UserRoutes.Dashboard} />} />
      <Route path={UserRoutes.Dashboard} element={<UserDashboard />} />
    </RoutesWithNotFound>
  )
}

export default User
