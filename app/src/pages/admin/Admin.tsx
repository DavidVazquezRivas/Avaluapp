import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { AdminRoutes } from '@/constants/routes'
import { Navigate, Route } from 'react-router-dom'
import { lazy } from 'react'

const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const UsersPage = lazy(() => import('./pages/users/UsersPage'))
const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'))
const ProjectDetailPage = lazy(
  () => import('./pages/projectdetail/ProjectDetailPage')
)

export const Admin = () => {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={AdminRoutes.Dashboard} />} />
      <Route path={AdminRoutes.Dashboard} element={<AdminDashboard />} />
      <Route path={AdminRoutes.Users} element={<UsersPage />} />
      <Route path={AdminRoutes.Projects} element={<ProjectsPage />} />
      <Route path={AdminRoutes.ProjectDetail} element={<ProjectDetailPage />} />
    </RoutesWithNotFound>
  )
}

export default Admin
