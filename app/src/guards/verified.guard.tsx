import { PrivateRoutes } from '@/constants/routes'
import { isSessionVerified } from '@/utils/session.utils'
import { Navigate, Outlet } from 'react-router-dom'

export const VerifiedGuard = () => {
  const isVerified = isSessionVerified()

  return isVerified ? (
    <Outlet />
  ) : (
    <Navigate to={PrivateRoutes.Verify} replace />
  )
}
