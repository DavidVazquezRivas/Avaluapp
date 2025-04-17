import NotFound from '@/pages/notfound/NotFound'
import Login from '@/pages/login/Login'
import AppTheme from './theme/AppTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PUBLIC_ROUTES } from './constants/routes'
import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import { PublicPrivateInterceptor } from '@/interceptors/publicprivate.interceptor'

function App() {
  useEffect(() => {
    PublicPrivateInterceptor()
  }, [])

  return (
    <AppTheme>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppTheme>
  )
}

export default App
