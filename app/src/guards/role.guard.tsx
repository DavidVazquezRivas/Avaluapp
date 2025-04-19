import { Role } from '@/models/role.model'
import { getSession } from '@/utils/session.utils'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  role: Role
}

export const RoleGuard = ({ role }: Props) => {
  const session = getSession()
  return session?.user?.role === role ? <Outlet /> : <Navigate to='/' replace />
}
