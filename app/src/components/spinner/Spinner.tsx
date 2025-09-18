import { CircularProgress, Box, useTheme } from '@mui/material'

const LoadingSpinner = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: theme.zIndex.tooltip + 1000,
      }}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingSpinner
