import NotFound from '@/pages/notfound/NotFound'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '@/pages/login/Login'
import { PUBLIC_ROUTES } from './constants/routes'
import AppTheme from './theme/AppTheme'
import { CssBaseline } from '@mui/material'

function App() {
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
