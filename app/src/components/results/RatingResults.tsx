import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Result } from '@/models/answer.model'
import { BarChart, NumberDisplay } from '@/components/graphics'
import { useTranslation } from 'react-i18next'

interface RatingResultsProps {
  result: Result
}

export const RatingResults: React.FC<RatingResultsProps> = ({ result }) => {
  const { t } = useTranslation()
  const { answers, question } = result

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

        <BarChart
          data={answers}
          title={t('globals.results.answers')}
          sortOrder='natural'
        />
      </Stack>
    </Stack>
  )
}
