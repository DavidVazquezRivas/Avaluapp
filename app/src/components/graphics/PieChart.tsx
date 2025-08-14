import React, { useMemo } from 'react'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'
import { useTranslation } from 'react-i18next'
import {
  blue,
  red,
  orange,
  green,
  purple,
  teal,
  brown,
  grey,
} from '@mui/material/colors'
import { BaseGraphicCard } from './BaseGraphicCard'
import { BaseAnswer } from '@/models/answer.model'

interface PieChartProps {
  data: BaseAnswer[]
  maxSlices?: number
  title?: string
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  maxSlices = 8,
  title,
}) => {
  const { t } = useTranslation()

  const chartData = useMemo(() => {
    // Count frequency of each value
    const valueCount = new Map<string, number>()

    data.forEach((answer) => {
      const value = String(answer.value)
      valueCount.set(value, (valueCount.get(value) || 0) + 1)
    })

    // Convert to array and sort by frequency
    let sortedData = Array.from(valueCount.entries())
      .map(([label, count]) => ({
        id: label,
        label,
        value: count,
      }))
      .sort((a, b) => b.value - a.value)

    // If there are more items than maxSlices, group the smaller ones into "Others"
    if (sortedData.length > maxSlices) {
      const topSlices = sortedData.slice(0, maxSlices - 1)
      const othersValue = sortedData
        .slice(maxSlices - 1)
        .reduce((sum, item) => sum + item.value, 0)

      sortedData = [
        ...topSlices,
        {
          id: 'others',
          label: 'Otros',
          value: othersValue,
        },
      ]
    }

    return sortedData
  }, [data, maxSlices])

  // MUI colors
  const colors = [
    blue[600],
    red[500],
    orange[500],
    green[600],
    purple[500],
    teal[500],
    brown[500],
    grey[600],
    blue[400],
    red[300],
  ]

  if (chartData.length === 0) {
    return (
      <BaseGraphicCard title={title || t('globals.graphics.pieChart.title')}>
        <div>{t('globals.graphics.noData')}</div>
      </BaseGraphicCard>
    )
  }

  return (
    <BaseGraphicCard title={title || t('globals.graphics.pieChart.title')}>
      <MuiPieChart
        series={[
          {
            data: chartData.map((item, index) => ({
              ...item,
              color: colors[index % colors.length],
            })),
            innerRadius: 15,
            outerRadius: 70,
            paddingAngle: 2,
            cornerRadius: 4,
            cx: 140,
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        margin={{ left: -60 }}
        width={200}
        height={210}
      />
    </BaseGraphicCard>
  )
}
