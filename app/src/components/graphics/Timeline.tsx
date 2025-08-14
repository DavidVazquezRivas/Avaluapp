import React, { useMemo } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { useTranslation } from 'react-i18next'
import { blue } from '@mui/material/colors'
import { BaseGraphicCard } from './BaseGraphicCard'
import { BaseAnswer } from '@/models/answer.model'

interface TimelineProps {
  data: BaseAnswer[]
  groupBy?: 'day' | 'week' | 'month'
  title?: string
}

export const Timeline: React.FC<TimelineProps> = ({
  data,
  groupBy = 'day',
  title,
}) => {
  const { t } = useTranslation()

  const timelineData = useMemo(() => {
    const grouped = new Map<string, number>()

    // Group by period
    data.forEach((answer) => {
      const date = new Date(answer.answeredAt)
      let key: string

      switch (groupBy) {
        case 'week':
          const monday = new Date(date)
          monday.setDate(date.getDate() - date.getDay() + 1)
          key = monday.toISOString().split('T')[0]
          break
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
          )}`
          break
        default:
          key = date.toISOString().split('T')[0]
      }

      grouped.set(key, (grouped.get(key) || 0) + 1)
    })

    // Convert to sorted and cumulative array
    let cumulative = 0
    return Array.from(grouped.entries())
      .map(([dateStr, count]) => ({ date: new Date(dateStr), count }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => {
        cumulative += item.count
        return { date: item.date, count: cumulative }
      })
  }, [data, groupBy])

  const formatDate = (date: Date) => {
    switch (groupBy) {
      case 'month':
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
        })
      case 'week':
        return `Sem ${Math.ceil(date.getDate() / 7)}`
      default:
        return date.toLocaleDateString('es-ES', {
          month: 'short',
          day: 'numeric',
        })
    }
  }

  if (timelineData.length === 0) {
    return (
      <BaseGraphicCard title={title || t('globals.graphics.timeline.title')}>
        <div>{t('globals.graphics.noData')}</div>
      </BaseGraphicCard>
    )
  }

  return (
    <BaseGraphicCard title={title || t('globals.graphics.timeline.title')}>
      <LineChart
        series={[
          {
            data: timelineData.map((item) => item.count),
            color: blue[600],
            area: true,
          },
        ]}
        xAxis={[
          {
            data: timelineData.map((item) => item.date),
            scaleType: 'time',
            valueFormatter: formatDate,
          },
        ]}
        width={380}
        height={210}
        margin={{ left: 0, right: 10, top: 10, bottom: 30 }}
        sx={{
          '& .MuiLineElement-root': { strokeWidth: 2 },
          '& .MuiAreaElement-root': { fillOpacity: 0.3 },
        }}
      />
    </BaseGraphicCard>
  )
}
