import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { AdminRoutes, PublicRoutes, UserRoutes } from '@/constants/routes'
import { Role } from '@/models/role.model'
import { getSession } from '@/utils/session.utils'
import { Navigate, Route } from 'react-router-dom'

const getRedirectRoute = (role?: Role): string => {
  switch (role) {
    case Role.Admin:
      return AdminRoutes.Base
    case Role.User:
      return UserRoutes.Base
    default:
      return PublicRoutes.Login
  }
}

const Private = () => {
  const session = getSession()
  const userRole = session?.user?.role
  const redirectTo = getRedirectRoute(userRole)

  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={redirectTo} replace />} />
    </RoutesWithNotFound>
  )
}

export default Private
