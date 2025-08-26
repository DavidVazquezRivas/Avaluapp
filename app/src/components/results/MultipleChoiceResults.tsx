import React, { useMemo } from 'react'
import { Stack, Typography } from '@mui/material'
import { BaseAnswer, Result } from '@/models/answer.model'
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

  const parsedAnswers: BaseAnswer[] = answers.map((a) => {
    return {
      answeredAt: a.answeredAt,
      answer: JSON.parse(a.answer as string) as string[],
    }
  })

  const averageResponsesPerAnswer = useMemo(() => {
    if (parsedAnswers.length === 0) return 0

    const totalSelections = parsedAnswers.reduce((total, answer) => {
      const selections = Array.isArray(answer.answer)
        ? answer.answer
        : [answer.answer]
      return total + selections.length
    }, 0)

    return totalSelections / parsedAnswers.length
  }, [parsedAnswers])

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
          value={parsedAnswers.length}
          title={t('globals.results.nAnswers')}
        />

        <NumberDisplay
          value={averageResponsesPerAnswer}
          title={t('globals.results.avgResponsesPerAnswer')}
        />

        <PieChart data={parsedAnswers} title={t('globals.results.answers')} />
      </Stack>
    </Stack>
  )
}
