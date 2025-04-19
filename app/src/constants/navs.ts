import { NavItem } from '@/models/nav.model'
import { AdminRoutes, UserRoutes } from './routes'

export const UserNavs: NavItem[] = [
  { value: 'dashboard', href: `${UserRoutes.Base}/${UserRoutes.Dashboard}` },
]

export const AdminNavs: NavItem[] = [
  { value: 'dashboard', href: `${AdminRoutes.Base}/${AdminRoutes.Dashboard}` },
  { value: 'users', href: `${AdminRoutes.Base}/${AdminRoutes.Users}` },
]
