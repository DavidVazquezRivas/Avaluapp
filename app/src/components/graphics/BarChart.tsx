import React, { useMemo } from 'react'
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart'
import { useTranslation } from 'react-i18next'
import { blue } from '@mui/material/colors'
import { BaseGraphicCard } from './BaseGraphicCard'
import { BaseAnswer } from '@/models/answer.model'

interface BarChartProps {
  data: BaseAnswer[]
  maxBars?: number
  sortOrder?: 'asc' | 'desc' | 'natural' | 'none'
  title?: string
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxBars = 10,
  sortOrder = 'desc',
  title,
}) => {
  const { t } = useTranslation()

  const chartData = useMemo(() => {
    // Count frequency of each value
    const valueCount = new Map<string, number>()

    data.forEach((answer) => {
      const value = String(answer.answer)
      valueCount.set(value, (valueCount.get(value) || 0) + 1)
    })

    // Convert to array
    let sortedData = Array.from(valueCount.entries()).map(([label, count]) => ({
      label,
      count,
    }))

    // Apply sorting
    switch (sortOrder) {
      case 'none':
        // No sorting applied
        break
      case 'asc':
        sortedData = sortedData.sort((a, b) => a.count - b.count)
        break
      case 'desc':
        sortedData = sortedData.sort((a, b) => b.count - a.count)
        break
      case 'natural':
        // Try to sort naturally if they are numbers
        const isNumeric = sortedData.every((item) => !isNaN(Number(item.label)))
        if (isNumeric) {
          sortedData = sortedData.sort(
            (a, b) => Number(a.label) - Number(b.label)
          )
        } else {
          sortedData = sortedData.sort((a, b) => a.label.localeCompare(b.label))
        }
        break
    }

    // Limit number of bars if necessary
    if (sortedData.length > maxBars) {
      const topBars = sortedData.slice(0, maxBars - 1)
      const othersCount = sortedData
        .slice(maxBars - 1)
        .reduce((sum, item) => sum + item.count, 0)

      sortedData = [
        ...topBars,
        {
          label: 'Otros',
          count: othersCount,
        },
      ]
    }

    return sortedData
  }, [data, maxBars, sortOrder])

  if (chartData.length === 0) {
    return (
      <BaseGraphicCard title={title || t('globals.graphics.barChart.title')}>
        <div>{t('globals.graphics.noData')}</div>
      </BaseGraphicCard>
    )
  }

  return (
    <BaseGraphicCard title={title || t('globals.graphics.barChart.title')}>
      <MuiBarChart
        dataset={chartData}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'label',
            tickPlacement: 'middle',
          },
        ]}
        series={[
          {
            dataKey: 'count',
            color: blue[600],
          },
        ]}
        width={380}
        height={210}
        margin={{ left: -10, right: 10, top: 20, bottom: 30 }}
        borderRadius={8}
      />
    </BaseGraphicCard>
  )
}
