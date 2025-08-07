import { useSuspenseQuery } from '@tanstack/react-query'
import getSurveyQuestionsQueryOptions from '../queries/get.survey.questions.query'
import { Box, Paper, Divider } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { QuestionComponent } from '@/components/questions'
import { useState, useMemo } from 'react'
import { SurveyHeader } from './SurveyHeader'
import { SurveyProgress } from './SurveyProgress'
import { SurveyNavigation } from './SurveyNavigation'
import { QuestionStatus } from './StepIndicator'

interface SurveyFormProps {
  surveyCode: string
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ surveyCode }) => {
  const methods = useForm()
  const { data: questions } = useSuspenseQuery(
    getSurveyQuestionsQueryOptions(surveyCode)
  )
  const [currentStep, setCurrentStep] = useState(0)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const handleSubmit = (data: any) => {
    console.log('Survey responses:', data)
    console.log('Survey code:', surveyCode)
    // TODO: Implementar envío de respuestas
  }

  const progress =
    questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0

  const handlePreviousStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  const handleNextStep = async () => {
    // Validar la pregunta actual antes de avanzar
    const currentQuestion = questions[currentStep]
    const fieldName = `${currentQuestion.id}`
    const isCurrentValid = await methods.trigger(fieldName)

    if (isCurrentValid) {
      setCurrentStep(Math.min(questions.length - 1, currentStep + 1))
    }
    // Si no es válida, el error se mostrará automáticamente
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleFormSubmit = async () => {
    // Marcar que se ha intentado enviar
    setHasAttemptedSubmit(true)

    // Primero intentar validar todo el formulario para actualizar los estados de error
    const isValid = await methods.trigger()

    if (isValid) {
      methods.handleSubmit(handleSubmit)()
    }
    // Si no es válido, los estados de error se actualizarán automáticamente
  }

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === questions.length - 1

  // Calcular el estado de cada pregunta
  const questionStatuses: QuestionStatus[] = useMemo(() => {
    return questions.map((question: any) => {
      const fieldName = `${question.id}`
      const fieldValue = methods.getValues(fieldName)
      const fieldState = methods.getFieldState(fieldName)

      // Si hay errores detectados por react-hook-form, marcar como error
      if (fieldState.error) {
        return 'error'
      }

      // Solo verificar preguntas obligatorias si se ha intentado enviar
      if (hasAttemptedSubmit && question.required) {
        const isEmpty =
          fieldValue === undefined ||
          fieldValue === null ||
          fieldValue === '' ||
          (Array.isArray(fieldValue) && fieldValue.length === 0)

        if (isEmpty) {
          return 'error'
        }
      }

      // Si hay valor, marcar como respondida
      if (
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue !== ''
      ) {
        // Para arrays (preguntas de opción múltiple), verificar que tenga elementos
        if (Array.isArray(fieldValue)) {
          return fieldValue.length > 0 ? 'answered' : 'unanswered'
        }
        return 'answered'
      }

      return 'unanswered'
    })
  }, [questions, methods.formState, methods.getValues(), hasAttemptedSubmit])

  console.log(questions)

  return (
    <Box sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Box sx={{ maxWidth: { xs: '100%', sm: 600, md: 800 }, mx: 'auto' }}>
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: (theme) => theme.shadows[8],
            bgcolor: 'background.paper',
            backdropFilter: 'blur(10px)',
          }}>
          <FormProvider {...methods}>
            <Box component='form' onSubmit={methods.handleSubmit(handleSubmit)}>
              <SurveyHeader />

              <Box
                sx={{
                  minHeight: { xs: 200, sm: 240, md: 280 },
                  maxHeight: { xs: 200, sm: 240, md: 280 },
                  mb: { xs: 3, sm: 4 },
                  p: { xs: 1, sm: 2 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  overflow: 'auto',
                  className: 'only-scrollbar',
                }}>
                {questions.length > 0 && (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <QuestionComponent
                      question={questions[currentStep]}
                      id={`${questions[currentStep].id}`}
                    />
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 4 }} />

              <SurveyProgress
                currentStep={currentStep}
                totalSteps={questions.length}
                progress={progress}
              />

              <SurveyNavigation
                questions={questions}
                currentStep={currentStep}
                onPreviousStep={handlePreviousStep}
                onNextStep={handleNextStep}
                onStepChange={handleStepChange}
                onSubmit={handleFormSubmit}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                questionStatuses={questionStatuses}
              />
            </Box>
          </FormProvider>
        </Paper>
      </Box>
    </Box>
  )
}
