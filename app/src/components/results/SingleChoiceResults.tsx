import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Result } from '@/models/answer.model'
import { PieChart, NumberDisplay } from '@/components/graphics'
import { useTranslation } from 'react-i18next'

interface SingleChoiceResultsProps {
  result: Result
}

export const SingleChoiceResults: React.FC<SingleChoiceResultsProps> = ({
  result,
}) => {
  const { t } = useTranslation()
  const { answers, question } = result

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

        <PieChart data={answers} title={t('globals.results.answers')} />
      </Stack>
    </Stack>
  )
}
