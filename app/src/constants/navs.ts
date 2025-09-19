import { NavItem } from '@/models/nav.model'
import { AdminRoutes, UserRoutes } from './routes'

export const UserNavs: NavItem[] = [
  { value: 'dashboard', href: `${UserRoutes.Base}/${UserRoutes.Dashboard}` },
  { value: 'surveys', href: `${UserRoutes.Base}/${UserRoutes.Survey}` },
  { value: 'answers', href: `${UserRoutes.Base}/${UserRoutes.Answers}` },
]

export const AdminNavs: NavItem[] = [
  { value: 'dashboard', href: `${AdminRoutes.Base}/${AdminRoutes.Dashboard}` },
  { value: 'users', href: `${AdminRoutes.Base}/${AdminRoutes.Users}` },
  {
    value: 'projects.title',
    href: `${AdminRoutes.Base}/${AdminRoutes.Projects}`,
    children: [
      {
        value: 'projects.list',
        href: `${AdminRoutes.Base}/${AdminRoutes.Projects}`,
      },
    ],
  },
]
