import { Box, Typography, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface SurveyProgressProps {
  currentStep: number
  totalSteps: number
  progress: number
}

export const SurveyProgress: React.FC<SurveyProgressProps> = ({
  currentStep,
  totalSteps,
  progress,
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ mb: { xs: 3, sm: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
          px: { xs: 0.5, sm: 0 },
        }}>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {t('public.survey.form.progress')}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {Math.round(progress)}%
        </Typography>
      </Box>
      <LinearProgress
        variant='determinate'
        value={progress}
        sx={{
          height: { xs: 6, sm: 8 },
          borderRadius: 4,
          backgroundColor: 'action.disabled',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          },
        }}
      />
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{
          textAlign: 'center',
          mt: 1,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
        }}>
        {t('public.survey.form.questionCounter', {
          current: currentStep + 1,
          total: totalSteps,
        })}
      </Typography>
    </Box>
  )
}
