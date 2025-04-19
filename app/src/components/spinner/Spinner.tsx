import { CircularProgress, Fade } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const LoadingSpinner = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)

  return (
    <Fade in={isLoading} timeout={{ enter: 300, exit: 500 }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease-in-out',
        }}>
        <CircularProgress
          thickness={4.5}
          size={60}
          style={{ color: '#1976d2' }}
        />
      </div>
    </Fade>
  )
}

export default LoadingSpinner
