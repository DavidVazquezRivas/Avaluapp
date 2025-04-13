import { Attribution } from '@/models/attribution.model'
import { Box } from '@mui/material'

interface LayoutProps {
  children: React.ReactNode
  attributions?: Attribution[]
}

// This is a placeholder layout component.
const Layout: React.FC<LayoutProps> = ({ children, attributions }) => {
  // TODO - Add attributions to the footer
  return (
    <Box
      minHeight='100vh'
      width='100%'
      display='grid'
      sx={{ placeItems: 'center' }}>
      {children}
    </Box>
  )
}

export default Layout
