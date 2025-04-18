import AppTheme from './theme/AppTheme'
import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import {
  AdminRoutes,
  PrivateRoutes,
  PublicRoutes,
  UserRoutes,
} from './constants/routes'
import { CssBaseline } from '@mui/material'
import { Suspense, useEffect, useState, lazy } from 'react'
import { PublicPrivateInterceptor } from '@/interceptors/publicprivate.interceptor'
import { haveSession, refreshSession } from '@/utils/session.utils'
import { PrivateGuard } from '@/guards/private.guard'
import { RoleGuard } from '@/guards/role.guard'
import { Role } from '@/models/role.model'

const Login = lazy(() => import('@/pages/login/Login'))
const Private = lazy(() => import('@/pages/private/Private'))
const Admin = lazy(() => import('@/pages/admin/Admin'))
const User = lazy(() => import('@/pages/user/User'))

function App() {
  const [loading, setLoading] = useState(true)

  const tryRefreshSession = async () => {
    try {
      await refreshSession()
    } catch (e) {
      // User not logged, guards will redirect if needed
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    PublicPrivateInterceptor()
    if (!haveSession()) tryRefreshSession()
  }, [])

  const loader = <div>Loading...</div> // TODO: Add a spinner or loading screen

  if (loading) {
    return loader
  }

  return (
    <AppTheme>
      <CssBaseline />
      <Suspense fallback={loader}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={PrivateRoutes.Private} />} />
            <Route path={PublicRoutes.Login} element={<Login />} />
            <Route element={<PrivateGuard />}>
              <Route
                path={`${PrivateRoutes.Private}/*`}
                element={<Private />}
              />
            </Route>
            <Route element={<RoleGuard role={Role.Admin} />}>
              <Route path={`${AdminRoutes.Base}/*`} element={<Admin />} />
            </Route>
            <Route element={<RoleGuard role={Role.User} />}>
              <Route path={`${UserRoutes.Base}/*`} element={<User />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Suspense>
    </AppTheme>
  )
}

export default App
