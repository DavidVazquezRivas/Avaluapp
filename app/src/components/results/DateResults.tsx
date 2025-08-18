import React, { useMemo } from 'react'
import { Stack, Typography } from '@mui/material'
import { Result } from '@/models/answer.model'
import { BarChart, NumberDisplay } from '@/components/graphics'
import { useTranslation } from 'react-i18next'

interface DateResultsProps {
  result: Result
}

export const DateResults: React.FC<DateResultsProps> = ({ result }) => {
  const { t } = useTranslation()
  const { answers, question } = result

  // Process dates to get 5 intervals
  const processedData = useMemo(() => {
    if (answers.length === 0) return []

    // Convert all answer dates to Date objects
    const dates = answers
      .map((answer) => {
        const dateValue =
          typeof answer.value === 'string' ? answer.value : String(answer.value)
        return new Date(dateValue)
      })
      .filter((date) => !isNaN(date.getTime())) // Filter invalid dates

    if (dates.length === 0) return []

    // Find min and max dates
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))

    // Calculate interval between dates (in milliseconds)
    const totalRange = maxDate.getTime() - minDate.getTime()
    const intervalSize = totalRange / 5

    // Determine granularity based on total range
    const rangeInDays = totalRange / (1000 * 60 * 60 * 24)
    const rangeInYears = rangeInDays / 365.25

    let formatOptions: Intl.DateTimeFormatOptions
    if (rangeInYears > 2) {
      formatOptions = { year: 'numeric' }
    } else if (rangeInDays > 60) {
      formatOptions = { year: 'numeric', month: 'short' }
    } else {
      formatOptions = { month: 'short', day: 'numeric' }
    }

    // Create groups
    const groups = Array.from({ length: 5 }, (_, i) => {
      const startTime = minDate.getTime() + i * intervalSize
      const endTime = minDate.getTime() + (i + 1) * intervalSize
      const startDate = new Date(startTime)
      const endDate = new Date(endTime)

      return {
        label: `${startDate.toLocaleDateString(
          'es-ES',
          formatOptions
        )} - ${endDate.toLocaleDateString('es-ES', formatOptions)}`,
        count: 0,
        startTime,
        endTime: i === 4 ? maxDate.getTime() : endTime, // Last group includes max date
      }
    })

    // Count dates in each group
    dates.forEach((date) => {
      const dateTime = date.getTime()
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        if (dateTime >= group.startTime && dateTime <= group.endTime) {
          group.count++
          break
        }
      }
    })

    // Format to chart
    return groups
      .map((group) => ({
        value: group.label,
        answeredAt: new Date().toISOString(),
      }))
      .flatMap((group) =>
        Array(groups.find((g) => g.label === group.value)?.count || 0).fill(
          group
        )
      )
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

        <BarChart
          data={processedData}
          title={t('globals.results.answers')}
          sortOrder='natural'
        />
      </Stack>
    </Stack>
  )
}
