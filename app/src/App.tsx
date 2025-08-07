import RoutesWithNotFound from '@/components/routing/RoutesWithNotFound'
import refreshSessionQueryOptions from './queries/refresh.query'
import LoadingSpinner from './components/spinner/Spinner'
import { BrowserRouter, Navigate, Route, useLocation } from 'react-router-dom'
import {
  AdminRoutes,
  PrivateRoutes,
  PublicRoutes,
  UserRoutes,
} from './constants/routes'
import { useEffect, lazy } from 'react'
import { useQueries } from '@tanstack/react-query'
import { PublicPrivateInterceptor } from '@/interceptors/publicprivate.interceptor'
import { ErrorInterceptor } from '@/interceptors/error.interceptor'
import { PrivateGuard } from '@/guards/private.guard'
import { RoleGuard } from '@/guards/role.guard'
import { Role } from '@/models/role.model'
import { PanelProvider } from '@/contexts/PanelContext'
import { Panel } from '@/components/panel/Panel'
import { VerifiedGuard } from './guards/verified.guard'
import Verify from './pages/private/verify/Verify'

const Login = lazy(() => import('@/pages/login/Login'))
const SurveyPage = lazy(() => import('@/pages/public/survey/SurveyPage'))
const Private = lazy(() => import('@/pages/private/Private'))
const Admin = lazy(() => import('@/pages/admin/Admin'))
const User = lazy(() => import('@/pages/user/User'))

function AppContent() {
  const location = useLocation()

  const isPrivateRoute =
    location.pathname.startsWith(AdminRoutes.Base) ||
    location.pathname.startsWith(UserRoutes.Base) ||
    location.pathname.startsWith(PrivateRoutes.Private)

  const queries = isPrivateRoute ? [refreshSessionQueryOptions()] : []
  const results = useQueries({ queries })
  const isPending = results.length > 0 ? results[0].isPending : false

  useEffect(() => {
    PublicPrivateInterceptor()
    ErrorInterceptor()
  }, [])

  if (isPending && isPrivateRoute) {
    return <LoadingSpinner />
  }

  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.Private} />} />
      <Route path={PublicRoutes.Login} element={<Login />} />
      <Route path={PublicRoutes.Survey} element={<SurveyPage />} />
      <Route element={<PrivateGuard />}>
        <Route path={PrivateRoutes.Verify} element={<Verify />} />
        <Route element={<VerifiedGuard />}>
          <Route path={`${PrivateRoutes.Private}/*`} element={<Private />} />
          <Route element={<RoleGuard role={Role.Admin} />}>
            <Route path={`${AdminRoutes.Base}/*`} element={<Admin />} />
          </Route>
          <Route element={<RoleGuard role={Role.User} />}>
            <Route path={`${UserRoutes.Base}/*`} element={<User />} />
          </Route>
        </Route>
      </Route>
    </RoutesWithNotFound>
  )
}

function App() {
  return (
    <PanelProvider>
      <BrowserRouter>
        <AppContent />
        <Panel />
      </BrowserRouter>
    </PanelProvider>
  )
}

export default App
