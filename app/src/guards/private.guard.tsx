import { PublicRoutes } from '@/constants/routes'
import { haveSession } from '@/utils/session.utils'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateGuard = () => {
  return haveSession() ? (
    <Outlet />
  ) : (
    <Navigate to={PublicRoutes.Login} replace />
  )
}
