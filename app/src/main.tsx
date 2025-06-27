import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@/translation/i18n'
import App from './App.tsx'
import store from '@/redux/store.ts'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import AppTheme from './theme/AppTheme.tsx'
import { CssBaseline } from '@mui/material'
import LoadingSpinner from './components/spinner/Spinner.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// TODO, if any API call uses language, rerender the app when language changes
// see how to: https://github.com/DavidVazquezRivas/Filmema/commit/0762144edeef4548a38b2c7c43b8ff11f65e9eb4
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppTheme>
          <CssBaseline />
          <Suspense fallback={<LoadingSpinner />}>
            <App />
          </Suspense>
        </AppTheme>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
