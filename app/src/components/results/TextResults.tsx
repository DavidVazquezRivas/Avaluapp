import React, { useMemo } from 'react'
import { Stack, Typography } from '@mui/material'
import { Result } from '@/models/answer.model'
import { Timeline, NumberDisplay } from '@/components/graphics'
import { useTranslation } from 'react-i18next'

interface TextResultsProps {
  result: Result
}

export const TextResults: React.FC<TextResultsProps> = ({ result }) => {
  const { t } = useTranslation()
  const { answers, question } = result

  // Calculate average length of answers
  const averageLength = useMemo(() => {
    if (answers.length === 0) return 0

    const totalLength = answers.reduce((total, answer) => {
      return total + String(answer.answer).length
    }, 0)

    return totalLength / answers.length
  }, [answers])

  return (
    <Stack direction='column' spacing={2} width='100%' alignItems='center'>
      <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
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
          value={averageLength}
          title={t('globals.results.avgLength')}
        />

        <Timeline data={answers} title={t('globals.results.nAnswersInTime')} />
      </Stack>
    </Stack>
  )
}
