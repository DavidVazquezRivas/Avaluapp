import { useQuery } from '@tanstack/react-query'
import { Role } from '@/models/role.model'
import { AdminNavs, UserNavs } from '@/constants/navs'
import { NavItem } from '@/models/nav.model'
import { getSession } from '@/utils/session.utils'
import { AdminRoutes } from '@/constants/routes'
import getAllProjectsQueryOptions from '@/pages/admin/pages/projects/queries/getAll.project.query'

interface UseNavItemsReturn {
  navItems: NavItem[]
  isLoadingProjects: boolean
}

export const useNavItems = (): UseNavItemsReturn => {
  const session = getSession()
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    isFetching,
  } = useQuery(getAllProjectsQueryOptions())

  if (!session?.user?.role) {
    return { navItems: [], isLoadingProjects: false }
  }

  switch (session.user.role) {
    case Role.Admin:
      const projectsNav: NavItem[] = projects.map((project: any) => ({
        value: project.name,
        href: `${AdminRoutes.Base}/${AdminRoutes.Projects}/${project.id}`,
        unlocated: true,
      }))

      const navItems = AdminNavs.map((nav) => {
        if (nav.value === 'projects.title') {
          return {
            ...nav,
            children: [...(nav.children || []), ...projectsNav],
          }
        }
        return nav
      })

      return { navItems, isLoadingProjects: isLoadingProjects || isFetching }
    case Role.User:
      return { navItems: UserNavs, isLoadingProjects: false }
    default:
      return { navItems: [], isLoadingProjects: false }
  }
}
