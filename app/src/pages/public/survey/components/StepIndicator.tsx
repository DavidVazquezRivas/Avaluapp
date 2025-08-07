import { Box } from '@mui/material'
import { Question } from '@/models/question.model'

export type QuestionStatus = 'unanswered' | 'answered' | 'error'

interface StepIndicatorProps {
  questions: Question[]
  currentStep: number
  onStepChange: (step: number) => void
  isLastStep: boolean
  questionStatuses: QuestionStatus[]
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  questions,
  currentStep,
  onStepChange,
  isLastStep,
  questionStatuses,
}) => {
  const getStepColor = (index: number) => {
    const status = questionStatuses[index]
    if (index === currentStep) {
      return 'primary.main'
    }

    switch (status) {
      case 'answered':
        return 'success.main'
      case 'error':
        return 'error.main'
      default:
        return 'action.disabled'
    }
  }

  const getStepHoverColor = (index: number) => {
    const status = questionStatuses[index]
    if (index === currentStep) {
      return 'primary.dark'
    }

    switch (status) {
      case 'answered':
        return 'success.dark'
      case 'error':
        return 'error.dark'
      default:
        return 'action.hover'
    }
  }
  return (
    <Box
      sx={{
        flex: { xs: 'none', sm: 1 },
        display: 'flex',
        justifyContent: 'center',
        width: { xs: '100%', sm: 'auto' },
        order: { xs: -1, sm: 0 },
        mb: { xs: 1, sm: 0 },
        // Espacio fijo para evitar layout shift cuando aparece/desaparece el botón de envío
        minWidth: { sm: isLastStep ? 160 : 120 },
        transition: 'min-width 0.2s ease',
      }}>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 0.5, sm: 1 },
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {questions.map((_: Question, index: number) => (
          <Box
            key={index}
            sx={{
              width: { xs: 10, sm: 12 },
              height: { xs: 10, sm: 12 },
              borderRadius: '50%',
              backgroundColor: getStepColor(index),
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: getStepHoverColor(index),
              },
            }}
            onClick={() => onStepChange(index)}
          />
        ))}
      </Box>
    </Box>
  )
}
