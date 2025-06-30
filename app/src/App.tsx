import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import refreshSessionQueryOptions from './queries/refresh.query'
import LoadingSpinner from './components/spinner/Spinner'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import {
  AdminRoutes,
  PrivateRoutes,
  PublicRoutes,
  UserRoutes,
} from './constants/routes'
import { useEffect, lazy } from 'react'
import { PublicPrivateInterceptor } from '@/interceptors/publicprivate.interceptor'
import { ErrorInterceptor } from '@/interceptors/error.interceptor'
import { PrivateGuard } from '@/guards/private.guard'
import { RoleGuard } from '@/guards/role.guard'
import { Role } from '@/models/role.model'
import { useQueries } from '@tanstack/react-query'
import { PanelProvider } from '@/contexts/PanelContext'
import { Panel } from '@/components/panel/Panel'

const Login = lazy(() => import('@/pages/login/Login'))
const Private = lazy(() => import('@/pages/private/Private'))
const Admin = lazy(() => import('@/pages/admin/Admin'))
const User = lazy(() => import('@/pages/user/User'))

function App() {
  const [{ isPending }] = useQueries({
    queries: [refreshSessionQueryOptions()],
  })

  useEffect(() => {
    PublicPrivateInterceptor()
    ErrorInterceptor()
  }, [])

  if (isPending) {
    return <LoadingSpinner />
  }

  return (
    <PanelProvider>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={PrivateRoutes.Private} />} />
          <Route path={PublicRoutes.Login} element={<Login />} />
          <Route element={<PrivateGuard />}>
            <Route path={`${PrivateRoutes.Private}/*`} element={<Private />} />
          </Route>
          <Route element={<RoleGuard role={Role.Admin} />}>
            <Route path={`${AdminRoutes.Base}/*`} element={<Admin />} />
          </Route>
          <Route element={<RoleGuard role={Role.User} />}>
            <Route path={`${UserRoutes.Base}/*`} element={<User />} />
          </Route>
        </RoutesWithNotFound>
        <Panel />
      </BrowserRouter>
    </PanelProvider>
  )
}

export default App
