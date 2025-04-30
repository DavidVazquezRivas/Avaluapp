import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { AdminRoutes } from '@/constants/routes'
import { Navigate, Route } from 'react-router-dom'
import { lazy } from 'react'

const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const UsersPage = lazy(() => import('./pages/users/UsersPage'))

export const Admin = () => {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={AdminRoutes.Dashboard} />} />
      <Route path={AdminRoutes.Dashboard} element={<AdminDashboard />} />
      <Route path={AdminRoutes.Users} element={<UsersPage />} />
    </RoutesWithNotFound>
  )
}

export default Admin
