import { Box, Button, Container, Paper, Typography, Stack } from '@mui/material'
import { CheckCircle, Home } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { PrivateRoutes } from '@/constants/routes'

export const SentPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(PrivateRoutes.Private, { replace: true })
  }

  return (
    <Layout>
      <Container maxWidth='sm' sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
          }}>
          <Stack spacing={4} alignItems='center'>
            {/* Success Icon */}
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: 'success.main',
                color: 'white',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    opacity: 0.9,
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                },
              }}>
              <CheckCircle sx={{ fontSize: 64 }} />
            </Box>

            {/* Title */}
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
              }}>
              {t('public.sent.title')}
            </Typography>

            {/* Main Message */}
            <Typography
              variant='h6'
              component='p'
              color='text.secondary'
              sx={{
                mb: 2,
                lineHeight: 1.6,
              }}>
              {t('public.sent.message')}
            </Typography>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: '100%', maxWidth: 400 }}>
              <Button
                variant='contained'
                size='large'
                startIcon={<Home />}
                onClick={handleGoHome}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}>
                {t('public.sent.actions.home')}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Layout>
  )
}

export default SentPage
