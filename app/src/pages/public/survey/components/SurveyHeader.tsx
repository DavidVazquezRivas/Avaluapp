import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const SurveyHeader: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ mb: { xs: 3, sm: 4 }, textAlign: 'center' }}>
      <Typography
        variant='h3'
        component='h1'
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          mb: { xs: 1.5, sm: 2 },
          fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
        }}>
        {t('public.survey.form.title')}
      </Typography>

      <Typography
        variant='body1'
        sx={{
          color: 'text.secondary',
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '0.875rem', sm: '1rem' },
          px: { xs: 1, sm: 0 },
        }}>
        {t('public.survey.form.description')}
      </Typography>
    </Box>
  )
}
