import { Attribution } from '@/models/attribution.model'
import { Box, Container } from '@mui/material'
import Header from '@/components/layout/header/Header'
import Footer from '@/components/layout/footer/Footer'

interface LayoutProps {
  children: React.ReactNode
  attributions?: Attribution[]
}

const Layout: React.FC<LayoutProps> = ({ children, attributions }) => {
  return (
    <>
      <Box
        component='section'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        minHeight='100vh'>
        <Header />
        <Container maxWidth='lg' sx={{ mt: 5 }}>
          {children}
        </Container>
      </Box>
      <Footer attributions={attributions} />
    </>
  )
}

export default Layout
