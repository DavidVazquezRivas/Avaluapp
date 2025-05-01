import AppTheme from '@/theme/AppTheme'
import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import LoadingSpinner from '@/components/spinner/Spinner'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import {
  AdminRoutes,
  PrivateRoutes,
  PublicRoutes,
  UserRoutes,
} from '@/constants/routes'
import { CssBaseline } from '@mui/material'
import { Suspense, useEffect, lazy, useState } from 'react'
import { PublicPrivateInterceptor } from '@/interceptors/publicprivate.interceptor'
import { ErrorInterceptor } from '@/interceptors/error.interceptor'
import { LoadingInterceptor } from '@/interceptors/loading.interceptor'
import { haveSession, refreshSession } from '@/utils/session.utils'
import { PrivateGuard } from '@/guards/private.guard'
import { RoleGuard } from '@/guards/role.guard'
import { Role } from '@/models/role.model'
import { PanelProvider } from '@/contexts/PanelContext'
import { Panel } from '@/components/panel/Panel'

const Login = lazy(() => import('@/pages/login/Login'))
const Private = lazy(() => import('@/pages/private/Private'))
const Admin = lazy(() => import('@/pages/admin/Admin'))
const User = lazy(() => import('@/pages/user/User'))

function App() {
  const [sessionChecked, setSessionChecked] = useState(false)
  const tryRefreshSession = async () => {
    setSessionChecked(false)
    try {
      if (haveSession()) throw new Error('Session already exists')
      await refreshSession()
    } catch (e) {
      // User not logged or already existing session, guards will redirect if needed
    } finally {
      setSessionChecked(true)
    }
  }

  useEffect(() => {
    PublicPrivateInterceptor()
    ErrorInterceptor()
    LoadingInterceptor()
    if (!haveSession()) tryRefreshSession()
  }, [])

  if (!sessionChecked) {
    return (
      <AppTheme>
        <CssBaseline />
        <LoadingSpinner />
      </AppTheme>
    )
  }

  return (
    <AppTheme>
      <CssBaseline />
      <LoadingSpinner />
      <Suspense fallback={<LoadingSpinner />}>
        <PanelProvider>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path='/'
                element={<Navigate to={PrivateRoutes.Private} />}
              />
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
            <Panel />
          </BrowserRouter>
        </PanelProvider>
      </Suspense>
    </AppTheme>
  )
}

export default App
