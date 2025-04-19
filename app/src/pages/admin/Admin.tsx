import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { AdminRoutes } from '@/constants/routes'
import { Navigate, Route } from 'react-router-dom'
import { lazy } from 'react'

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

export const Admin = () => {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={AdminRoutes.Dashboard} />} />
      <Route path={AdminRoutes.Dashboard} element={<AdminDashboard />} />
    </RoutesWithNotFound>
  )
}

export default Admin
