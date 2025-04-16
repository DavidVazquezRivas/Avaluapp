import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@/translation/i18n'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// TODO, if any API call uses language, rerender the app when language changes
// see how to: https://github.com/DavidVazquezRivas/Filmema/commit/0762144edeef4548a38b2c7c43b8ff11f65e9eb4

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
