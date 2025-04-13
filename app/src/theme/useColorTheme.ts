import { createTheme, PaletteMode } from '@mui/material'
import { getDesignTokens } from '@/theme/theme.ts'
import { useMemo, useState } from 'react'

export const useColorTheme = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const defaultMode: PaletteMode = prefersDarkMode ? 'dark' : 'light'
  const [mode, setMode] = useState<PaletteMode>(defaultMode)

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  )

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  }
}
