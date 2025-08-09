import { Box, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { StepIndicator, QuestionStatus } from './StepIndicator'
import { Question } from '@/models/question.model'

interface SurveyNavigationProps {
  questions: Question[]
  currentStep: number
  onPreviousStep: () => void
  onNextStep: () => void
  onStepChange: (step: number) => void
  onSubmit: () => void
  isFirstStep: boolean
  isLastStep: boolean
  questionStatuses: QuestionStatus[]
}

export const SurveyNavigation: React.FC<SurveyNavigationProps> = ({
  questions,
  currentStep,
  onPreviousStep,
  onNextStep,
  onStepChange,
  onSubmit,
  isFirstStep,
  isLastStep,
  questionStatuses,
}) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: { xs: 2, sm: 0 },
        minHeight: { xs: 'auto', sm: 56 },
      }}>
      <Stack
        direction='row'
        spacing={2}
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        alignItems='center'
        sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 160 } }}>
        <Button
          variant='outlined'
          onClick={onPreviousStep}
          disabled={isFirstStep}
          sx={{
            minWidth: { xs: 100, sm: 120 },
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}>
          {t('public.survey.form.navigation.previous')}
        </Button>
      </Stack>

      <StepIndicator
        questions={questions}
        currentStep={currentStep}
        onStepChange={onStepChange}
        isLastStep={isLastStep}
        questionStatuses={questionStatuses}
      />

      <Stack
        direction='row'
        spacing={2}
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        alignItems='center'
        sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 160 } }}>
        {isLastStep ? (
          <Button
            type='submit'
            variant='contained'
            size='large'
            onClick={onSubmit}
            color='success'
            sx={{
              minWidth: { xs: 100, sm: 120 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              boxShadow: (theme) => theme.shadows[4],
              '&:hover': {
                boxShadow: (theme) => theme.shadows[8],
              },
            }}>
            {t('public.survey.form.navigation.submit')}
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={onNextStep}
            sx={{
              minWidth: { xs: 100, sm: 120 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}>
            {t('public.survey.form.navigation.next')}
          </Button>
        )}
      </Stack>
    </Box>
  )
}
