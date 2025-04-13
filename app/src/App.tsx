import { CssBaseline, ThemeProvider } from '@mui/material'
import { useThemeContext } from '@/theme/ThemeContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={''} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
