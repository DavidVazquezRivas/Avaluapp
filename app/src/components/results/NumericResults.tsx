import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Result } from '@/models/answer.model'
import { BoxPlot, NumberDisplay } from '@/components/graphics'
import { useTranslation } from 'react-i18next'

interface NumericResultsProps {
  result: Result
}

export const NumericResults: React.FC<NumericResultsProps> = ({ result }) => {
  const { t } = useTranslation()
  const { answers, question } = result

  const numericAnswers = answers.map((answer) => ({
    value: Number(answer.value),
    answeredAt: answer.answeredAt,
  }))

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

        <BoxPlot data={numericAnswers} title={t('globals.results.answers')} />
      </Stack>
    </Stack>
  )
}
