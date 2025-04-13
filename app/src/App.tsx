import { CssBaseline, ThemeProvider } from '@mui/material'
import { useThemeContext } from '@/theme/ThemeContextProvider'

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
