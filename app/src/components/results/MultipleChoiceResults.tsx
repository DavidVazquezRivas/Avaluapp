import React, { useMemo } from 'react'
import { Stack, Typography } from '@mui/material'
import { Result } from '@/models/answer.model'
import { PieChart, NumberDisplay } from '@/components/graphics'
import { useTranslation } from 'react-i18next'

interface MultipleChoiceResultsProps {
  result: Result
}

export const MultipleChoiceResults: React.FC<MultipleChoiceResultsProps> = ({
  result,
}) => {
  const { t } = useTranslation()
  const { answers, question } = result

  const averageResponsesPerAnswer = useMemo(() => {
    if (answers.length === 0) return 0

    const totalSelections = answers.reduce((total, answer) => {
      const selections = Array.isArray(answer.value)
        ? answer.value
        : [answer.value]
      return total + selections.length
    }, 0)

    return totalSelections / answers.length
  }, [answers])

  return (
    <Stack direction='column' spacing={2} width='100%' alignItems='center'>
      <Typography variant='h6' gutterBottom>
        {question.text}
      </Typography>
      <Stack
        direction='row'
        justifyContent='center'
        width='100%'
        p={2}
        spacing={2}>
        <NumberDisplay
          value={answers.length}
          title={t('globals.results.nAnswers')}
        />

        <NumberDisplay
          value={averageResponsesPerAnswer}
          title={t('globals.results.avgResponsesPerAnswer')}
        />

        <PieChart data={answers} title={t('globals.results.answers')} />
      </Stack>
    </Stack>
  )
}
